// Google Ads conversion helper.
//
// gtag.js and the global `gtag()` are loaded once for GA4 (see
// components/analytics/google-analytics.tsx) and the Ads account is registered
// as an additional destination (see components/analytics/google-ads.tsx). This
// module just fires conversion events against that shared gtag — it relies on
// the `Window.gtag` type declared in lib/gtag.ts.

/**
 * Report a Google Ads conversion. `sendTo` is the action's "AW-<id>/<label>"
 * value from its event snippet (see site.googleAdsConversions).
 *
 * No `event_callback`/redirect is used: callers fire this from a passive click
 * listener without intercepting the navigation, and gtag beacons the hit via
 * navigator.sendBeacon, so it still sends as the dialer/new page takes over.
 *
 * No-ops on the server, when gtag hasn't loaded, or when `sendTo` is empty.
 */
export function trackAdsConversion(sendTo: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (!sendTo) return;
  window.gtag?.("event", "conversion", { send_to: sendTo, ...params });
}
