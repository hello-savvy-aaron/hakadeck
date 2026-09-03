"use client";

import { useEffect, useState } from "react";
import { NO_TRACK_KEY } from "@/components/analytics/analytics-gate";
import { Button } from "@/components/ui/button";

type Status = "loading" | "tracking" | "excluded" | "unavailable";

export function NoTrackToggle() {
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    try {
      setStatus(window.localStorage.getItem(NO_TRACK_KEY) === "1" ? "excluded" : "tracking");
    } catch {
      setStatus("unavailable");
    }
  }, []);

  function setExcluded(excluded: boolean) {
    try {
      if (excluded) window.localStorage.setItem(NO_TRACK_KEY, "1");
      else window.localStorage.removeItem(NO_TRACK_KEY);
      setStatus(excluded ? "excluded" : "tracking");
    } catch {
      setStatus("unavailable");
    }
  }

  if (status === "loading") {
    return <p className="text-muted-foreground text-sm">Checking this browser&hellip;</p>;
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
        The flag lives in this browser only — repeat this once on each browser and device you use
        (work laptop, phone, etc.). Clearing site data resets it. This page itself may register
        one final page view the first time, since the scripts were already loaded when you
        arrived.
      </p>
    </div>
  );
}
