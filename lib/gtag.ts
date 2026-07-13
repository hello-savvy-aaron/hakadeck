// Google Analytics 4 event helper.
//
// The gtag.js script and the global `gtag()` function are injected once by
// `components/analytics/google-analytics.tsx` (mounted in the root layout).
// This module only types that global and wraps event tracking so call sites
// don't repeat the `window` guard.
//
// GA4 custom events are free and unlimited (unlike Vercel Web Analytics, which
// gates custom events behind a paid plan), so this is where CTA click counts
// actually land for reporting.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fire a GA4 event. Show up under Reports → Engagement → Events (and can be
 * marked as key events / conversions there). No-ops on the server, or when
 * gtag hasn't loaded / GA isn't configured.
 */
export function trackGa(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
}
