"use client";

import { useState, useSyncExternalStore } from "react";
import { NO_TRACK_KEY } from "@/components/analytics/analytics-gate";
import { Button } from "@/components/ui/button";

type Stored = "tracking" | "excluded" | "unavailable";
type Status = Stored | "loading" | "reloading";

// Read the flag directly rather than through isNoTrack(), which hides storage
// failures — this page needs to explain when the flag can't be saved here.
function readStored(): Stored {
  try {
    return window.localStorage.getItem(NO_TRACK_KEY) === "1" ? "excluded" : "tracking";
  } catch {
    return "unavailable";
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

const getServerSnapshot = (): Status => "loading";

export function NoTrackToggle() {
  const stored = useSyncExternalStore<Status>(subscribe, readStored, getServerSnapshot);
  const [reloading, setReloading] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);

  const status: Status = saveFailed ? "unavailable" : reloading ? "reloading" : stored;

  function setExcluded(excluded: boolean) {
    try {
      if (excluded) window.localStorage.setItem(NO_TRACK_KEY, "1");
      else window.localStorage.removeItem(NO_TRACK_KEY);
    } catch {
      setSaveFailed(true);
      return;
    }
    // Trackers are injected once per full page load and survive client-side
    // navigation, so a flag flipped mid-session would leave the scripts that
    // are already running (GA4, GTM, Ads, Reddit) counting until the next
    // reload. Reload now: AnalyticsGate re-reads the flag on the way back in,
    // so the trackers never load again — or, when opting back in, load fresh.
    setReloading(true);
    window.location.reload();
  }

  if (status === "loading" || status === "reloading") {
    return (
      <p className="text-muted-foreground text-sm">
        {status === "loading" ? "Checking this browser…" : "Applying and reloading…"}
      </p>
    );
  }

  if (status === "unavailable") {
    return (
      <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
        This browser is blocking local storage, so the flag can&apos;t be saved here. Try again
        outside private browsing, or with site data allowed.
      </p>
    );
  }

  const excluded = status === "excluded";

  return (
    <div className="max-w-xl space-y-6">
      <div
        className={`rounded-2xl border p-6 ${
          excluded ? "border-haka-pine/40 bg-haka-pine/5" : "border-border/60 bg-card/40"
        }`}
      >
        <p className="font-display text-xl font-medium tracking-tight">
          {excluded ? "This browser is excluded. ✓" : "This browser is being counted."}
        </p>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          {excluded
            ? "Analytics scripts no longer load for you here — your visits, page views, and clicks don't reach Google Analytics, Google Ads, Reddit, or Vercel from this browser. The flag survives restarts and IP changes."
            : "Your visits from this browser currently count in the site's analytics like any visitor's."}
        </p>
      </div>

      <Button size="lg" className="h-12 px-6 text-base" onClick={() => setExcluded(!excluded)}>
        {excluded ? "Count me again" : "Stop counting this browser"}
      </Button>

      <p className="text-muted-foreground text-xs leading-relaxed">
        Flipping the switch reloads this page so any trackers already running are unloaded on the
        spot. The flag lives in this browser only — repeat this once on each browser, profile, and
        device you use (work laptop, phone, private windows), and note it covers www.hakadecks.com
        only: a preview-deployment URL is a different site to the browser. Clearing site data resets
        it, and Safari can drop it after about a week without a visit. This page itself is never
        counted by Vercel, even before you flip the switch.
      </p>
    </div>
  );
}
