// Fire-and-forget notification when a visitor taps a call button.
//
// Called from CtaAnalytics' site-wide tel: click handler. Posts the click plus
// the session's first-touch attribution (lib/attribution.ts) to
// /api/call-notify, which emails Pete so he has context on who's ringing —
// what page they called from, how they found the site, and how long they
// browsed first.
//
// Uses sendBeacon (falling back to keepalive fetch) because a tel: click is a
// navigation: on mobile the page backgrounds immediately as the dialer opens,
// and a plain fetch would often be killed before it leaves.

import { getAttribution } from "@/lib/attribution";

// One email per number per minute per tab. A visitor double-tapping the same
// button, or tapping Call in the header and again in the hero, is one call —
// not three emails.
const THROTTLE_MS = 60_000;

export function notifyCallClick(telHref: string, page: string): void {
  if (typeof window === "undefined") return;

  const throttleKey = `haka-call-notified:${telHref}`;
  try {
    const last = Number(window.sessionStorage.getItem(throttleKey));
    if (last && Date.now() - last < THROTTLE_MS) return;
    window.sessionStorage.setItem(throttleKey, String(Date.now()));
  } catch {
    // Storage unavailable — send anyway; server rate limiting backstops.
  }

  const attribution = getAttribution();
  const body = JSON.stringify({
    number: telHref.replace(/^tel:/, "").slice(0, 40),
    page: page.slice(0, 300),
    attribution,
  });

  try {
    const sent = navigator.sendBeacon?.(
      "/api/call-notify",
      new Blob([body], { type: "application/json" }),
    );
    if (sent) return;
  } catch {
    // Some browsers throw on Blob payloads — fall through to fetch.
  }
  fetch("/api/call-notify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {
    // Best-effort — never surface an error for a background notification.
  });
}
