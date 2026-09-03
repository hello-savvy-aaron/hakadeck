"use client";

import { useEffect, useState } from "react";

// Kill switch for every behavior-reporting pixel (GTM, GA4, Google Ads,
// Reddit, Vercel Analytics, and the CTA click listeners). The owner visits
// /no-track once per browser, which sets this localStorage flag; from the
// next page load on, this component simply never mounts the trackers, so
// their visits stop counting everywhere at once — independent of IP.
//
// Children render only after a client-side check confirms the flag is absent.
// That defers pixel injection to just after hydration, which is when the
// `afterInteractive` scripts would fire anyway, so the delay costs nothing.
export const NO_TRACK_KEY = "haka-no-track";

export function AnalyticsGate({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(NO_TRACK_KEY) !== "1") setEnabled(true);
    } catch {
      // Storage unavailable (private mode with storage blocked) — default to
      // tracking, same as any anonymous visitor.
      setEnabled(true);
    }
  }, []);

  return enabled ? <>{children}</> : null;
}
