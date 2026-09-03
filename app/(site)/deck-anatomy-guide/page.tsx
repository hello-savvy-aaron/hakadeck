import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CtaFinal } from "@/components/sections/cta-final";
import { GuideArticleJsonLd } from "@/components/seo/guide-article-jsonld";
import { NewsletterSignup } from "@/components/guides/newsletter-signup";
import {
  Lead,
  H2,
  P,
  Muted,
  Callout,
  InlineCta,
  StatRows,
  DataTable,
} from "@/components/guides/guide-content";
import { DeckAnatomyFigure, LedgerDetailFigure } from "@/components/guides/figure-diagrams";
import { guideBySlug, GUIDES_HUB } from "@/lib/guides";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const guide = guideBySlug("deck-anatomy-guide")!;

const title = "Deck Anatomy: How a Colorado Deck Holds Together (2026) | Haka Decks";
const description =
  "The structure under the boards, diagrammed — ledger and flashing, frost footings, joist spans, hardware, and the Colorado loads that size all of it. No fluff, real numbers.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: guide.href },
  openGraph: { title, description, url: `${site.url}${guide.href}` },
};

export default function AnatomyGuidePage() {
  return (
    <>
      <GuideArticleJsonLd
        title={title}
        description={description}
        path={guide.href}
        datePublished="2026-09-03"
        dateModified="2026-09-03"
      />

      <div className="mx-auto max-w-[42.5rem] px-5 pt-28 pb-20 sm:px-8 sm:pt-32">
        <Link
          href={GUIDES_HUB}
          className="text-primary hover:text-haka-pine inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All guides &amp; tools
        </Link>

        <h1 className="font-display text-foreground mt-3.5 text-[2rem] leading-[1.15] font-medium tracking-tight text-balance">
          Deck anatomy: how a Colorado deck holds together.
        </h1>
        <p className="text-muted-foreground mt-2 text-[13px]">
          {guide.readLabel} · Updated {guide.updated}
        </p>

        <article className="border-border bg-card mt-6 rounded-[14px] border p-6 shadow-[0_1px_3px_rgba(34,48,42,0.06)] sm:px-6">
          <Lead>
            Every deck is the same machine: a surface that hands its load to joists, joists that
            hand it to a beam and a ledger, and posts and footings that hand it to ground that
            freezes 30-plus inches deep. Understand that chain and every line on a deck bid — and
            every failure you&apos;ve ever seen — makes sense. Here&apos;s the whole structure,
            top to bottom, with the numbers Colorado adds.
          </Lead>

          <H2>Where does the weight actually go?</H2>
          <P>
            Follow a footstep down: decking → joists → beam and ledger → posts → footings → soil.
            Every part exists to move load one link down that chain, and every deck failure is one
            link giving up. The diagram below is the whole system in section — the same structure
            whether the deck costs $8,000 or $80,000.
          </P>
          <DeckAnatomyFigure />

          <H2>The ledger: the connection that decides everything</H2>
          <P>
            An attached deck borrows the house&apos;s structure through one horizontal board — the
            ledger. It carries roughly half the deck&apos;s weight, and it&apos;s where industry
            post-mortems trace the large majority of catastrophic collapses. The failure is almost
            never the board; it&apos;s the details: nails where structural screws belong, or
            missing flashing letting a decade of snowmelt rot the connection invisibly from
            behind.
          </P>
          <LedgerDetailFigure />
          <Muted>
            This is also why a &ldquo;deck pulling away from the house&rdquo; is a today problem,
            not a spring problem — our{" "}
            <Link href="/deck-safety-inspection-guide" className="text-primary font-semibold hover:underline">
              10-minute inspection guide
            </Link>{" "}
            shows you exactly what to look for from underneath.
          </Muted>

          <H2>Why do footings go 30–36 inches down?</H2>
          <P>
            Because that&apos;s where Front Range soil stops freezing. Water expands when it
            freezes, and soil that freezes lifts whatever sits on it — unevenly, every winter. A
            footing poured below frost depth stands on ground that never moves; a deck block
            resting on grade rides the frost like a boat. That&apos;s the entire argument, and
            it&apos;s why we pour proper caissons even for{" "}
            <Link href="/small-deck-builder-denver" className="text-primary font-semibold hover:underline">
              small and floating decks
            </Link>{" "}
            that could legally skip the permit.
          </P>
          <StatRows
            rows={[
              { label: "Front Range frost depth", value: '30–36"' },
              { label: "Typical footing, installed", value: "$150–600" },
              { label: "Design snow load (metro)", value: "30 psf" },
              { label: "Guardrail design load, any direction", value: "200 lb" },
              { label: "Guardrail height (required above 30\")", value: '36" min' },
            ]}
          />

          <H2>Joists and beams: the span math</H2>
          <P>
            A joist can only safely cover so much distance before it deflects — bounces — or
            fails. The spans Front Range permit reviewers work from (IRC Table R507.6, Douglas
            fir-larch #2, 16-inch spacing): 2×6 to about 9 feet, 2×8 to 11&apos;10&quot;, 2×10 to
            14 feet, 2×12 to 16&apos;6&quot;. A deck that{" "}
            <Link href="/blog/deck-feels-bouncy" className="text-primary font-semibold hover:underline">
              feels bouncy
            </Link>{" "}
            is usually telling you its joists are at or past these numbers — or that blocking and
            hardware have loosened with age.
          </P>
          <DataTable
            headers={["Member", "What it does", "The number that matters"]}
            rows={[
              ["Joists", "Carry the decking between ledger and beam", "16\" on center is the composite standard"],
              ["Beam", "Collects the joists, hands load to posts", "Doubled 2×10/2×12 is typical"],
              ["Posts", "Columns to the footings", "6×6 for anything with height"],
              ["Blocking", "Stops joists rolling, kills bounce", "Rows at mid-span"],
            ]}
          />

          <H2>Hardware: the metal that keeps wood honest</H2>
          <P>
            Wood moves with every freeze-thaw cycle; hardware is what holds the system together
            while it does. Joist hangers with a fastener in every hole, post bases that lift the
            wood off the concrete (posts buried in dirt rot from the bottom, invisibly), tension
            hardware at guardrail posts so a 200-pound shove goes into the frame rather than the
            fasteners, and hidden clips that let composite boards expand without popping screws.
            On a bid, hardware is a boring line. On a ten-year-old deck, it&apos;s the difference
            between tight and{" "}
            <Link href="/blog/wobbly-deck-railing-fix" className="text-primary font-semibold hover:underline">
              wobbly
            </Link>
            .
          </P>

          <H2>What does Colorado add to the design?</H2>
          <P>
            Altitude UV about 25% stronger than sea level, which is what kills wood surfaces and
            why we lead with{" "}
            <Link href="/services/composite-decks" className="text-primary font-semibold hover:underline">
              capped composite
            </Link>
            . A 30 psf design snow load that sizes every roofed structure — and wind uplift that
            loads a{" "}
            <Link href="/services/pergolas-patio-covers" className="text-primary font-semibold hover:underline">
              patio cover
            </Link>{" "}
            upward, which is the load flatland pergola kits never contemplated. Hail that decides
            roofing materials. And 35–90 freeze-thaw cycles a year working every fastener, which
            is why an annual{" "}
            <Link href="/deck-safety-inspection-guide" className="text-primary font-semibold hover:underline">
              ten-minute inspection
            </Link>{" "}
            is worth the ten minutes.
          </P>

          <InlineCta
            heading="Want this structure under your deck?"
            body="Every Haka bid itemizes the anatomy — footings, framing, hardware, surface — so you can see exactly what you're standing on."
          />

          <H2>Why this matters when you&apos;re hiring</H2>
          <P>
            Every question in our{" "}
            <Link href="/questions-to-ask-your-deck-builder" className="text-primary font-semibold hover:underline">
              contractor checklist
            </Link>{" "}
            is really an anatomy question: footing depth, joist spec, ledger detail, hardware
            schedule. A builder who answers with numbers is describing this page back to you. A
            builder who answers &ldquo;per code&rdquo; is hoping you don&apos;t know what code
            says — and now you do. The{" "}
            <Link href="/deck-cost-guide-denver" className="text-primary font-semibold hover:underline">
              cost guide
            </Link>{" "}
            shows what each layer of the anatomy costs, line by line.
          </P>

          <Callout>
            Codes vary by jurisdiction and change over time — treat the numbers here as
            orientation, and confirm specifics with your building department. Or{" "}
            <Link href="/contact" className="text-primary font-semibold hover:underline">
              have us handle it
            </Link>
            : permits, engineering, and inspections are part of every Haka build.
          </Callout>
        </article>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <Button asChild variant="outline" className="h-11">
            <Link href="/deck-safety-inspection-guide">Inspect your own deck →</Link>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <Link href="/deck-cost-guide-denver">What the anatomy costs →</Link>
          </Button>
        </div>

        <NewsletterSignup />

        <p className="text-muted-foreground mt-6 text-[13px]">
          Next up:{" "}
          <Link href="/deck-safety-inspection-guide" className="text-primary hover:text-haka-pine font-semibold">
            The 10-minute deck safety inspection →
          </Link>
        </p>
      </div>

      <CtaFinal />
    </>
  );
}
