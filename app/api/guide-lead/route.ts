import { NextResponse } from "next/server";
import { z } from "zod";

// Soft-gate lead capture for the Free Guides & Tools system. The PDF is never
// withheld (the client links straight to it) — this just records who asked and
// notifies Pete, mirroring the /api/contact delivery + rate-limit approach.

const HITS = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 60_000;
const MAX_HITS = 8;

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

const leadSchema = z.object({
  email: z.string().trim().email().max(160),
  // Which guide/tool the email was captured from (e.g. "cost-guide",
  // "newsletter", "estimator"). Bounded, non-PII.
  guide: z.string().trim().min(1).max(60),
  // Honeypot — must be empty.
  website: z.string().max(0).optional().or(z.literal("")),
});

// Last-resort capture so a lead is never lost when mail delivery fails. Recover
// from Vercel → Logs by searching "[guide-lead] LEAD CAPTURE".
function logLeadFallback(reason: string, data: unknown) {
  console.error(`[guide-lead] LEAD CAPTURE (${reason}) — delivery failed, recover manually:`);
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

  const parsed = leadSchema.safeParse(body);
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

  const { email, guide } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[guide-lead] RESEND_API_KEY unset — logging instead of sending:");
    console.log(JSON.stringify({ email, guide, at: new Date().toISOString() }, null, 2));
    return NextResponse.json({ ok: true, mode: "dev-log" });
  }

  // Same sender/recipient convention as /api/contact — RESEND_FROM must be a
  // verified hakadecks.com sender to deliver to any inbox; onboarding@resend.dev
  // only reaches the account owner. trim()/|| so a blank env var still falls back.
  const FROM = process.env.RESEND_FROM?.trim() || "Haka Decks <onboarding@resend.dev>";
  const TO = process.env.CONTACT_TO?.trim() || "pete@hakadecks.com";

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const label = guide === "newsletter" ? "Newsletter signup" : `Guide download — ${guide}`;
    const result = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New lead — ${label}: ${email}`,
      text: [`${label}`, `Email: ${email}`, `At: ${new Date().toISOString()}`].join("\n"),
    });
    if (result.error) {
      console.error("[guide-lead] resend rejected:", result.error);
      logLeadFallback("resend-rejected", { email, guide });
      return NextResponse.json({ error: "Send failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, id: result.data?.id });
  } catch (err) {
    console.error("[guide-lead] resend exception:", err);
    logLeadFallback("resend-exception", { email, guide });
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
