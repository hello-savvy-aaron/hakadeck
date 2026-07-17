import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DeckEstimator, EstimatorFooterLinks } from "@/components/guides/deck-estimator";
import { GUIDES_HUB } from "@/lib/guides";

// Phase two: built but intentionally unlinked (not in nav, not in the sitemap).
// noindex keeps it from surfacing / competing with /deck-cost-calculator until
// the team decides to launch it — flip this to a canonical when that happens.
export const metadata: Metadata = {
  title: { absolute: "Deck Cost Estimator — Denver Metro | Haka Decks" },
  description:
    "A step-by-step deck cost estimator built from 250+ real south Denver metro builds. Size, material, railing, height, stairs, and extras — a live planning range.",
  robots: { index: false, follow: true },
};

export default function DeckCostEstimatorPage() {
  return (
    <div className="mx-auto max-w-[33rem] px-5 pt-28 pb-20 sm:px-8 sm:pt-32">
      <Link
        href={GUIDES_HUB}
        className="text-primary hover:text-haka-pine inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All guides &amp; tools
      </Link>

      <h1 className="font-display text-foreground mt-3.5 text-[1.875rem] leading-[1.15] font-medium tracking-tight text-balance">
        Deck Cost Estimator.
      </h1>
      <p className="text-muted-foreground mt-1.5 mb-6 text-sm leading-relaxed">
        Built from 250+ real builds in the south Denver metro. No email needed.
      </p>

      <DeckEstimator />
      <EstimatorFooterLinks />
    </div>
  );
}
