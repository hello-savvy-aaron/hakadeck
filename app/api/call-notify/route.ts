import { NextResponse } from "next/server";
import { z } from "zod";
import { attributionSchema, geoFromHeaders, visitorContextLines } from "@/lib/visitor-context";

// Emails Pete the moment a visitor taps a call button, with everything we
// know about the caller: the page they called from, the page they landed on,
// how they found the site (referrer / UTM / ad click IDs), rough location
// (Vercel geo headers), device, and how long they browsed before calling.
// Fired by lib/call-notify.ts from the site-wide tel: click listener.
//
// The email races the phone call itself — by the time Pete looks at his
// inbox, this is the context for the call he just took (or missed).

const HITS = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 60_000;
const MAX_HITS = 3;

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

const notifySchema = z.object({
  number: z.string().trim().min(1).max(40),
  page: z.string().trim().min(1).max(300),
  attribution: attributionSchema,
});

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

  const parsed = notifySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { number, page, attribution } = parsed.data;

  const { city } = geoFromHeaders(req);
  const clickedAt = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Denver",
  }).format(new Date());

  const text = [
    `Someone tapped the call button (${number}) on the website just now — this email races the ring.`,
    "",
    `Called from page: ${page}`,
    ...visitorContextLines(req, attribution),
    `Clicked at: ${clickedAt} (Denver time)`,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[call-notify] RESEND_API_KEY unset — logging instead of sending:");
    console.log(text);
    return NextResponse.json({ ok: true, mode: "dev-log" });
  }

  // Same sender/recipient setup as /api/contact (see the comment there for
  // why trim()/|| rather than ??).
  const FROM = process.env.RESEND_FROM?.trim() || "Haka Decks <onboarding@resend.dev>";
  const TO = process.env.CONTACT_TO?.trim() || "pete@hakadecks.com";

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `📞 Call button tapped on ${page}${city ? ` — caller near ${city}` : ""}`,
      text,
    });
    if (result.error) {
      // Unlike a contact-form lead, there's nothing to recover — the call
      // itself still happened. Log and move on.
      console.error("[call-notify] resend rejected:", result.error);
      return NextResponse.json({ error: "Send failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, id: result.data?.id });
  } catch (err) {
    console.error("[call-notify] resend exception:", err);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
