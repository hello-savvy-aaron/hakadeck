import type { Metadata } from "next";
import { Eyebrow, Section } from "@/components/sections/section";
import { NoTrackToggle } from "./no-track-toggle";

// Owner-only utility: sets the localStorage flag that AnalyticsGate checks, so
// the owner's own browsing stops counting in every analytics tool at once.
// Deliberately unlinked, noindexed, and absent from the sitemap.
export const metadata: Metadata = {
  title: "Analytics opt-out",
  robots: { index: false, follow: false },
};

export default function NoTrackPage() {
  return (
    <Section top="loose">
      <Eyebrow>Site tools</Eyebrow>
      <h1 className="font-display mt-4 max-w-2xl text-4xl leading-[1.04] font-medium tracking-tight text-balance sm:text-5xl">
        Exclude this browser from analytics.
      </h1>
      <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
        For the Haka team: flip the switch below and this browser stops counting toward visitor,
        page-view, and conversion numbers — across every tracker the site runs.
      </p>
      <div className="mt-10">
        <NoTrackToggle />
      </div>
    </Section>
  );
}
