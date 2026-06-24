// Reddit Ads pixel helpers.
//
// The pixel script itself is injected once by
// `components/analytics/reddit-pixel.tsx` (mounted in the root layout). This
// module only types the global `rdt` command queue that snippet creates and
// wraps event tracking so call sites don't repeat the `window` guard.
//
// `rdt` queues calls until pixel.js finishes loading, so these helpers are safe
// to call immediately — including before the network request resolves.

declare global {
  interface Window {
    rdt?: (...args: unknown[]) => void;
  }
}

/**
 * Fire a Reddit conversion event (e.g. "PageVisit", "Lead"). No-ops on the
 * server, or when the pixel hasn't loaded / isn't configured.
 */
export function trackReddit(event: string, metadata?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (metadata) window.rdt?.("track", event, metadata);
  else window.rdt?.("track", event);
}
