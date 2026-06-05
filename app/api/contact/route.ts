import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

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
function logLeadFallback(reason: string, data: unknown) {
  console.error(`[contact] LEAD CAPTURE (${reason}) — delivery failed, recover manually:`);
  console.error(JSON.stringify(data, null, 2));
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

  // Honeypot — silently succeed on bot fills so they don't probe further.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[contact] RESEND_API_KEY unset — logging instead of sending:");
    console.log(JSON.stringify(parsed.data, null, 2));
    return NextResponse.json({ ok: true, mode: "dev-log" });
  }

  // TODO: switch `from` to `noreply@hakadecks.com` after the hakadecks.com domain
  // is verified in Resend (https://resend.com/domains). Until then, only the
  // pre-verified onboarding@resend.dev sender will pass Resend's checks.
  // Use trim()/|| (not ??) so an empty or whitespace-only env var falls back to
  // the working default. Production had RESEND_FROM="" set, which ?? passes
  // through to Resend as an empty sender → the send is rejected with a 502.
  const FROM = process.env.RESEND_FROM?.trim() || "Haka Decks <onboarding@resend.dev>";
  const TO = process.env.CONTACT_TO?.trim() || "pete@hakaconstruction.com";

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { name, email, phone, projectType, message, referral } = parsed.data;
    const text = [
      `From: ${name} <${email}>`,
      phone ? `Phone: ${phone}` : null,
      `Project type: ${projectType}`,
      referral ? `Heard via: ${referral}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const result = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New quote request — ${projectType}`,
      text,
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
