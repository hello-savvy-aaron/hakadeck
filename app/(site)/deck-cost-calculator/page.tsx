import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, Section, SectionHeading } from "@/components/sections/section";
import { CtaFinal } from "@/components/sections/cta-final";
import { DeckCostCalculator } from "@/components/forms/deck-cost-calculator";
import { site } from "@/lib/site";

const title = "Deck Cost Calculator — Denver Metro (2026) | Haka Decks";
const description =
  "Estimate what your deck will cost in the Denver metro. Real 2026 installed ranges by size, material, and height — from the builder, not a lead-gen site.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/deck-cost-calculator" },
  openGraph: {
    title,
    description,
    url: `${site.url}/deck-cost-calculator`,
  },
};

export default function DeckCostCalculatorPage() {
  return (
    <>
      <Section top="loose" bottom="tight">
        <Eyebrow>Free estimator</Eyebrow>
        <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.03] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
          What will your deck cost?
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
          Slide, tap, and get an honest 2026 planning range for the Denver metro — built from the
          same installed pricing we publish in our cost guides, not national averages that ignore
          Colorado altitude, hail, and frost-depth footings.
        </p>
      </Section>

      <Section top="none" bottom="tight">
        <DeckCostCalculator />
      </Section>

      <Section top="none" bottom="tight">
        <article className="prose prose-haka mx-auto max-w-3xl">
          <h2>How this estimate works</h2>
          <p>
            The calculator starts from real Denver-metro installed pricing —{" "}
            <strong>$40–$70 per square foot for capped composite</strong>, with cedar below it and
            exotic hardwood above — then adjusts for the two things that move a deck budget most:
            height off the ground and what you add to the platform. Elevated and walk-out decks
            carry taller posts, larger footings, and engineered railing loads, so they price above
            a ground-level build of the same size. Covers, stairs, teardown of an old deck, and
            premium railing are added as the flat ranges we actually see on quotes.
          </p>
          <p>
            For the full breakdown of where the money goes, read our{" "}
            <Link href="/blog/composite-deck-cost-denver">composite deck cost guide</Link> and the{" "}
            <Link href="/blog/deck-stairs-railings-cost-guide">
              stairs, railings &amp; add-ons cost guide
            </Link>
            .
          </p>
          <h2>Why a range and not a number</h2>
          <p>
            Because your yard hasn&apos;t been measured yet. Slope, soil, access for equipment,
            what the old deck is hiding, and your HOA&apos;s requirements all move the final
            figure. The range above is for planning and gut-checking bids; the real number comes
            from a{" "}
            <Link href="/contact">free on-site design consultation</Link> — we measure, look at
            the site, and quote the deck you actually want built.
          </p>
        </article>
      </Section>

      <CtaFinal />
    </>
  );
}
