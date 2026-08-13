import { NextResponse } from "next/server";
import { z } from "zod";

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

const paramsSchema = z
  .object({
    utm_source: z.string().max(200),
    utm_medium: z.string().max(200),
    utm_campaign: z.string().max(200),
    utm_term: z.string().max(200),
    utm_content: z.string().max(200),
    gclid: z.string().max(200),
    gbraid: z.string().max(200),
    wbraid: z.string().max(200),
    fbclid: z.string().max(200),
    msclkid: z.string().max(200),
    rdt_cid: z.string().max(200),
  })
  .partial();

const notifySchema = z.object({
  number: z.string().trim().min(1).max(40),
  page: z.string().trim().min(1).max(300),
  attribution: z
    .object({
      landingPage: z.string().max(500),
      referrer: z.string().max(500),
      params: paramsSchema,
      sessionStart: z.number(),
    })
    .nullable()
    .optional(),
});

type NotifyInput = z.infer<typeof notifySchema>;

// One-line answer to "how did they get to the site?", from strongest signal
// (an ad click ID) down to weakest (no referrer at all).
function describeSource(attribution: NotifyInput["attribution"]): string {
  if (!attribution) return "Unknown (visited before this update, or storage blocked)";
  const p = attribution.params;

  const parts: string[] = [];
  if (p.gclid || p.gbraid || p.wbraid) parts.push("Google Ads click");
  else if (p.msclkid) parts.push("Microsoft Ads click");
  else if (p.fbclid) parts.push("Facebook/Instagram click");
  else if (p.rdt_cid) parts.push("Reddit Ads click");

  if (p.utm_source) {
    const utm = [p.utm_source, p.utm_medium].filter(Boolean).join(" / ");
    parts.push(p.utm_campaign ? `${utm}, campaign "${p.utm_campaign}"` : utm);
  }
  if (parts.length) return parts.join(" — ");

  if (attribution.referrer) {
    try {
      const host = new URL(attribution.referrer).hostname.replace(/^www\./, "");
      if (host.includes("google.")) return "Google search (organic)";
      if (host.includes("bing.")) return "Bing search (organic)";
      if (host.includes("duckduckgo.")) return "DuckDuckGo search (organic)";
      return `Referred from ${host}`;
    } catch {
      return `Referred from ${attribution.referrer}`;
    }
  }
  return "Direct (typed the address, bookmark, or app link — no referrer)";
}

function describeTimeOnSite(sessionStart: number | undefined): string | null {
  if (!sessionStart) return null;
  const ms = Date.now() - sessionStart;
  if (ms < 0 || ms > 12 * 60 * 60 * 1000) return null; // clock skew / stale
  const minutes = Math.floor(ms / 60_000);
  const seconds = Math.round((ms % 60_000) / 1000);
  return minutes ? `${minutes} min ${seconds} sec` : `${seconds} sec`;
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

  const parsed = notifySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { number, page, attribution } = parsed.data;

  // Vercel geo headers — approximate, IP-based, URL-encoded ("Colorado%20Springs").
  const decode = (v: string | null) => {
    if (!v) return null;
    try {
      return decodeURIComponent(v);
    } catch {
      return v;
    }
  };
  const city = decode(req.headers.get("x-vercel-ip-city"));
  const region = decode(req.headers.get("x-vercel-ip-country-region"));
  const country = decode(req.headers.get("x-vercel-ip-country"));
  const location =
    [city, region, country !== "US" ? country : null].filter(Boolean).join(", ") || null;

  const userAgent = req.headers.get("user-agent") || "";
  const device = /mobile|iphone|android/i.test(userAgent) ? "Mobile" : "Desktop";

  const timeOnSite = describeTimeOnSite(attribution?.sessionStart);
  const clickedAt = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Denver",
  }).format(new Date());

  const text = [
    `Someone tapped the call button (${number}) on the website just now — this email races the ring.`,
    "",
    `Called from page: ${page}`,
    attribution?.landingPage ? `Landed on: ${attribution.landingPage}` : null,
    `How they found the site: ${describeSource(attribution)}`,
    timeOnSite ? `Time on site before calling: ${timeOnSite}` : null,
    location ? `Location (approx., from IP): ${location}` : null,
    `Device: ${device}${userAgent ? ` — ${userAgent}` : ""}`,
    `Clicked at: ${clickedAt} (Denver time)`,
  ]
    .filter(Boolean)
    .join("\n");

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
