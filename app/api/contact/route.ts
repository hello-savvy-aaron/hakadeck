import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { attributionSchema, visitorContextLines } from "@/lib/visitor-context";

const HITS = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 60_000;
const MAX_HITS = 5;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = HITS.get(ip);
  if (!bucket || now - bucket.first > WINDOW_MS) {
    HITS.set(ip, { count: 1, first: now });
    return true;
  }
  bucket.count += 1;
  return bucket.count <= MAX_HITS;
}

// Last-resort capture so a genuine inquiry is never lost when mail delivery
// fails. Recover these from Vercel → Logs by searching "[contact] LEAD CAPTURE".
// Note: this writes the submitter's details (incl. PII) to the server logs.
// Photo payloads are megabytes of base64 — logged as a count, never inline.
function logLeadFallback(reason: string, data: Record<string, unknown>) {
  const { photos, ...rest } = data;
  const summary = Array.isArray(photos) ? { ...rest, photos: `${photos.length} attached` } : rest;
  console.error(`[contact] LEAD CAPTURE (${reason}) — delivery failed, recover manually:`);
  console.error(JSON.stringify(summary, null, 2));
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "anon";

  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // First-touch attribution rides alongside the form fields (see
  // lib/attribution.ts). Never required — a malformed one is dropped, not a
  // reason to reject a lead.
  const attributionParsed = attributionSchema.safeParse(
    (body as { attribution?: unknown }).attribution,
  );
  const attribution = attributionParsed.success ? attributionParsed.data : null;

  // Honeypot — silently succeed on bot fills so they don't probe further.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    const { photos: devPhotos, ...devRest } = parsed.data;
    console.log("[contact] RESEND_API_KEY unset — logging instead of sending:");
    console.log(
      JSON.stringify(
        devPhotos ? { ...devRest, photos: `${devPhotos.length} attached` } : devRest,
        null,
        2,
      ),
    );
    console.log(visitorContextLines(req, attribution).join("\n"));
    return NextResponse.json({ ok: true, mode: "dev-log" });
  }

  // Prefer RESEND_FROM (set to a sender on the verified hakadeck.com domain, which can
  // deliver to any recipient). If it's unset/blank we fall back to onboarding@resend.dev,
  // Resend's shared testing sender — that only reaches the account owner's own inbox and
  // 403s for anyone else. Use trim()/|| (not ??) so an empty or whitespace-only env var
  // still falls back to the default rather than passing "" through as the sender.
  const FROM = process.env.RESEND_FROM?.trim() || "Haka Decks <onboarding@resend.dev>";
  const TO = process.env.CONTACT_TO?.trim() || "pete@hakadecks.com";

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { phone, email, referralSource, message, projectType, squareFootage, features, photos } =
      parsed.data;
    // Phone leads first — schema guarantees at least one of the two exists.
    const action = phone ? "call back" : "email back";
    const reachBack = phone || email!;
    const text = [
      phone ? `Phone: ${phone}` : null,
      email ? `Email: ${email}` : null,
      `How they found us (their answer): ${referralSource}`,
      projectType ? `About: ${projectType}` : null,
      squareFootage ? `Approx. size: ${squareFootage} sq ft` : null,
      features && features.length ? `Features: ${features.join(", ")}` : null,
      photos && photos.length ? `Photos: ${photos.length} attached` : null,
      "",
      message || "(no note)",
      "",
      "— Visitor context —",
      ...visitorContextLines(req, attribution),
    ]
      .filter((line): line is string => line !== null)
      .join("\n");

    const result = await resend.emails.send({
      from: FROM,
      to: TO,
      // Only wire replyTo when the lead left an email — a phone number isn't a
      // valid reply address and would make Resend reject the send.
      ...(email ? { replyTo: email } : {}),
      subject: `New lead — ${action}: ${reachBack}`,
      text,
      ...(photos && photos.length
        ? {
            attachments: photos.map((p, i) => ({
              filename: p.name || `photo-${i + 1}.jpg`,
              content: p.data,
            })),
          }
        : {}),
    });
    if (result.error) {
      console.error("[contact] resend rejected:", result.error);
      logLeadFallback("resend-rejected", parsed.data);
      return NextResponse.json({ error: "Send failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, id: result.data?.id });
  } catch (err) {
    console.error("[contact] resend exception:", err);
    logLeadFallback("resend-exception", parsed.data);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
