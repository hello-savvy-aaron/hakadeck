"use client";

import { useSyncExternalStore } from "react";

// Kill switch for every behavior-reporting pixel (GTM, GA4, Google Ads,
// Reddit, Vercel Analytics, and the CTA click listeners). The owner visits
// /no-track once per browser, which sets this localStorage flag; from the
// next page load on, this component simply never mounts the trackers, so
// their visits stop counting everywhere at once — independent of IP.
//
// The server (and hydration) snapshot is "off", so nothing is injected until
// the client has actually read the flag. That defers pixel injection to just
// after hydration, which is when the `afterInteractive` scripts would fire
// anyway, so the delay costs nothing.
//
// Tracker scripts, once injected, survive client-side navigation, so flipping
// the flag mid-session does not unload scripts that are already running —
// which is why the /no-track toggle reloads the page after flipping, and why
// vercel-analytics.tsx re-checks the flag on every event it sends.
export const NO_TRACK_KEY = "haka-no-track";
export const NO_TRACK_PATH = "/no-track";

/** True when this browser has opted out at /no-track. Client-side only. */
export function isNoTrack(): boolean {
  try {
    return window.localStorage.getItem(NO_TRACK_KEY) === "1";
  } catch {
    // Storage unavailable (private mode with storage blocked) — default to
    // tracking, same as any anonymous visitor.
    return false;
  }
}

// `storage` fires in *other* tabs when the flag changes, so a flip made on
// /no-track in one tab also unmounts the trackers in every other open tab.
function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

const getSnapshot = () => !isNoTrack();
const getServerSnapshot = () => false;

export function AnalyticsGate({ children }: { children: React.ReactNode }) {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return enabled ? <>{children}</> : null;
}
