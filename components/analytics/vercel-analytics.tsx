"use client";

import type { BeforeSendEvent } from "@vercel/analytics";
import { Analytics } from "@vercel/analytics/next";
import { isNoTrack, NO_TRACK_PATH } from "./analytics-gate";

// Vercel Web Analytics with the owner opt-out enforced at send time, not only
// at mount time. AnalyticsGate decides once per page load whether to inject the
// script at all; this `beforeSend` re-reads the flag for every page view and
// custom event, so flipping the switch takes effect immediately in a tab that
// is already running the tracker (Vercel's documented self-exclusion pattern).
// It also drops the /no-track page itself, so opening the opt-out page never
// registers a view — not even the first time, before the switch is flipped.
//
// Module-level so the reference is stable: the Analytics component
// re-registers the hook whenever the prop identity changes.
function beforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  if (isNoTrack()) return null;
  try {
    if (new URL(event.url, window.location.origin).pathname === NO_TRACK_PATH) return null;
  } catch {
    // Unparseable URL — let the event through rather than lose real data.
  }
  return event;
}

export function VercelAnalytics() {
  return <Analytics beforeSend={beforeSend} />;
}
