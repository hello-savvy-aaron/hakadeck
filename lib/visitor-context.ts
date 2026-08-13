import { z } from "zod";

// Server-side helpers shared by the lead-notification routes
// (/api/call-notify and /api/contact): validate the first-touch attribution
// the client captured (lib/attribution.ts) and turn it — plus request
// headers — into the human-readable "who is this?" lines in Pete's emails.

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

export const attributionSchema = z
  .object({
    landingPage: z.string().max(500),
    referrer: z.string().max(500),
    params: paramsSchema,
    sessionStart: z.number(),
  })
  .nullable()
  .optional();

export type AttributionPayload = z.infer<typeof attributionSchema>;

// One-line answer to "how did they get to the site?", from strongest signal
// (an ad click ID) down to weakest (no referrer at all).
export function describeSource(attribution: AttributionPayload): string {
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

// Vercel geo headers — approximate, IP-based, URL-encoded ("Colorado%20Springs").
export function geoFromHeaders(req: Request): { city: string | null; location: string | null } {
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
  return { city, location };
}

/** The shared tail of every lead email: how the visitor reached the site,
 *  where they landed, how long they browsed, and where/what they're on. */
export function visitorContextLines(req: Request, attribution: AttributionPayload): string[] {
  const { location } = geoFromHeaders(req);
  const userAgent = req.headers.get("user-agent") || "";
  const device = /mobile|iphone|android/i.test(userAgent) ? "Mobile" : "Desktop";
  const timeOnSite = describeTimeOnSite(attribution?.sessionStart);

  return [
    `How they got to the site: ${describeSource(attribution)}`,
    attribution?.landingPage ? `Landed on: ${attribution.landingPage}` : null,
    timeOnSite ? `Time on site: ${timeOnSite}` : null,
    location ? `Location (approx., from IP): ${location}` : null,
    `Device: ${device}${userAgent ? ` — ${userAgent}` : ""}`,
  ].filter((line): line is string => Boolean(line));
}
