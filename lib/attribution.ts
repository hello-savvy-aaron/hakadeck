// First-touch attribution for the current browser session.
//
// Captured once, on the first page the visitor lands on, and kept in
// sessionStorage so it survives in-site navigation but resets when the tab
// closes. Later navigations must not overwrite it — by then document.referrer
// is our own site and the UTM params are gone, which is exactly the
// information we want to preserve.
//
// Consumed by the call-notification beacon (lib/call-notify.ts) so the email
// Pete gets on a call click can say how the caller originally reached the
// site, not just what page they called from.

const STORAGE_KEY = "haka-attribution";
// First-EVER touch, kept in localStorage so it survives across sessions. A
// visitor who finds the site via Google on Monday and returns "direct" on
// Thursday to call still reports the Monday source — which is exactly the
// question ("how did you find us?") callers can't answer themselves.
const FIRST_KEY = "haka-first-touch";

// Ad/campaign query params worth reporting. Anything else in the URL is
// dropped — both to keep the payload small and to avoid forwarding junk.
const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid", // Google Ads
  "gbraid", // Google Ads (iOS)
  "wbraid", // Google Ads (iOS)
  "fbclid", // Meta
  "msclkid", // Microsoft Ads
  "rdt_cid", // Reddit Ads
] as const;

export type FirstTouch = {
  landingPage: string;
  referrer: string;
  params: Record<string, string>;
  /** Epoch ms of this browser's first-ever visit. */
  firstSeen: number;
};

export type Attribution = {
  /** Path + query of the first page of the session. */
  landingPage: string;
  /** document.referrer at landing (empty string for direct visits). */
  referrer: string;
  /** Campaign params present on the landing URL, allowlisted above. */
  params: Record<string, string>;
  /** Epoch ms when the session's first page loaded. */
  sessionStart: number;
  /** How this browser FIRST found the site, if it predates this session. */
  firstTouch?: FirstTouch;
};

/** Record first-touch attribution. Safe to call on every page; only the
 *  session's first call writes anything. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;

    const params: Record<string, string> = {};
    const search = new URLSearchParams(window.location.search);
    for (const key of TRACKED_PARAMS) {
      const value = search.get(key);
      if (value) params[key] = value.slice(0, 200);
    }

    const attribution: Attribution = {
      landingPage: window.location.pathname + window.location.search,
      referrer: document.referrer.slice(0, 500),
      params,
      sessionStart: Date.now(),
    };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));

    // First-ever touch: written once per browser, then never overwritten.
    // Kept in its own try so localStorage being blocked doesn't lose the
    // session capture above.
    try {
      if (!window.localStorage.getItem(FIRST_KEY)) {
        const first: FirstTouch = {
          landingPage: attribution.landingPage,
          referrer: attribution.referrer,
          params,
          firstSeen: attribution.sessionStart,
        };
        window.localStorage.setItem(FIRST_KEY, JSON.stringify(first));
      }
    } catch {
      // best-effort
    }
  } catch {
    // sessionStorage can throw (Safari private mode, disabled storage) —
    // attribution is best-effort, never break the page over it.
  }
}

/** The session's first-touch attribution (plus the browser's first-ever
 *  touch when one is recorded), or null if unavailable. */
export function getAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const attribution = JSON.parse(raw) as Attribution;
    try {
      const firstRaw = window.localStorage.getItem(FIRST_KEY);
      if (firstRaw) attribution.firstTouch = JSON.parse(firstRaw) as FirstTouch;
    } catch {
      // best-effort
    }
    return attribution;
  } catch {
    return null;
  }
}
