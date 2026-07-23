import type { Metadata } from "next";
import Link from "next/link";
import { CtaFinal } from "@/components/sections/cta-final";
import { GuideLayout } from "@/components/guides/guide-layout";
import { Lead, H2, P, Muted, Callout, StatRows } from "@/components/guides/guide-content";
import { GuideArticleJsonLd } from "@/components/seo/guide-article-jsonld";
import { guideBySlug } from "@/lib/guides";
import { site } from "@/lib/site";

const guide = guideBySlug("deck-safety-inspection-guide")!;

const title = "The 10-Minute Deck Safety Inspection — Check Your Own Deck (2026) | Haka Decks";
const description =
  "Inspect your own deck the way a pro would: the ledger, footings, posts, railings, and stairs, in order of what actually fails. Know whether you need repair, re-decking, or replacement — free printable PDF.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: guide.href },
  openGraph: { title, description, url: `${site.url}${guide.href}` },
};

const CHECKS: { area: string; look: string; worry: string }[] = [
  {
    area: "The ledger (where the deck meets the house)",
    look: "From underneath, find the horizontal board bolted against the house. Look for metal flashing over its top edge, real bolts or structural screws (not just nails), and dry, solid wood.",
    worry: "No visible flashing, rust streaks, soft or dark wet wood, or a ledger attached with nails alone. This is where most catastrophic deck collapses start — anything suspicious here is a call-a-pro finding, not a watch-it finding.",
  },
  {
    area: "Footings and posts",
    look: "Posts should sit on concrete footings via metal brackets — not buried in dirt, not resting on patio blocks. Sight down each post for lean; look at the footing tops for cracking or heaving.",
    worry: "Posts in ground contact (they rot from the bottom, invisibly), a footing that's lifted or tilted with frost, or daylight between post and bracket. Frost heave is Colorado's signature deck disease.",
  },
  {
    area: "Joists and framing",
    look: "Underneath, probe a few joists with a screwdriver — especially near the ledger and any stains. Solid wood resists; rot gives. Check that joist hangers have nails in every hole and no orange rust bloom.",
    worry: "A screwdriver that sinks in easily anywhere, hangers missing fasteners, or joists pulling away from the ledger. Blackened wood that's still hard is usually cosmetic; soft wood never is.",
  },
  {
    area: "Railings and posts",
    look: "Grab the top rail and push hard, at several points. It should feel like part of the structure, not furniture. Check that balusters are tight and spacing is under 4 inches.",
    worry: "Any visible movement at the post base. A railing that wobbles today fails on the day someone actually falls against it — and post connections are the most common failure we find on older and DIY decks.",
  },
  {
    area: "Stairs",
    look: "Walk them heavily. Check the stringers (the sawtooth boards) where they meet the deck and the ground, the tread fasteners, and the handrail's steadiness.",
    worry: "Bounce or flex mid-flight, stringers resting on bare dirt, treads cupped enough to hold water, or a handrail you wouldn't trust with your full weight. Stairs are where most deck injuries actually happen.",
  },
  {
    area: "The surface",
    look: "Scan for cupped, split, or spongy boards, popped fasteners, and gaps that have closed up (drainage matters). Note whether wear is cosmetic — graying, checking — or structural.",
    worry: "Soft spots underfoot mean the problem is below the boards, not in them. Widespread splitting on a 20+ year old wood deck usually means the surface is done even if the frame is sound — which is exactly what re-decking is for.",
  },
];

export default function InspectionGuidePage() {
  return (
    <>
      <GuideArticleJsonLd
        title={title}
        description={description}
        path={guide.href}
        datePublished="2026-07-23"
        dateModified="2026-07-23"
      />
      <GuideLayout
        guideKey={guide.key}
        pdfHref={guide.pdf!}
        title="The 10-minute deck safety inspection."
        meta={`${guide.readLabel} · Updated ${guide.updated}`}
        crossLink={{ href: "/services/deck-repair", label: "Deck repair service →" }}
        nextUp={{ href: "/questions-to-ask-your-deck-builder", label: "10 questions to ask before you sign" }}
      >
        <Lead>
          Most homeowners have never looked underneath their own deck. Ten minutes with a
          flashlight and a screwdriver will tell you more than any sales visit — here&apos;s the
          same sequence we run on every structural inspection, in order of what actually fails.
          Print it, walk your deck, and you&apos;ll know whether you&apos;re looking at nothing,
          a repair, or a real problem before anyone quotes you a dollar.
        </Lead>

        <div className="mt-5 flex flex-col gap-5">
          {CHECKS.map((c, i) => (
            <div key={i}>
              <div className="flex items-baseline gap-2.5">
                <span className="font-display text-primary text-[15px] font-semibold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-foreground text-lg font-medium tracking-tight">
                  {c.area}
                </h2>
              </div>
              <p className="text-muted-foreground mt-1.5 ml-[26px] text-[13.5px] leading-relaxed">
                <strong className="text-foreground/80 font-semibold">What to check: </strong>
                {c.look}
              </p>
              <p className="text-muted-foreground mt-1 ml-[26px] text-[13.5px] leading-relaxed">
                <strong className="text-foreground/80 font-semibold">When to worry: </strong>
                {c.worry}
              </p>
            </div>
          ))}
        </div>

        <H2>Scoring it: repair, re-deck, or replace</H2>
        <P>
          Rough triage from what you found — the same logic behind every{" "}
          <Link href="/services/deck-repair" className="text-primary font-semibold hover:underline">
            inspection we run
          </Link>
          :
        </P>
        <StatRows
          rows={[
            { label: "Surface wear only, structure checks out", value: "Restore or re-deck" },
            { label: "One or two isolated findings (a post, some boards)", value: "Targeted repair" },
            { label: "Ledger, footing, or framing findings", value: "Pro inspection now" },
            { label: "Multiple structural findings on a 20+ yr deck", value: "Likely replacement" },
          ]}
        />
        <Muted>
          The money logic: a{" "}
          <Link href="/services/deck-repair" className="text-primary font-semibold hover:underline">
            re-deck
          </Link>{" "}
          over sound framing costs meaningfully less than a{" "}
          <Link href="/services/deck-replacement" className="text-primary font-semibold hover:underline">
            full replacement
          </Link>{" "}
          — which is why an honest structural verdict is worth real dollars, and why ours comes as
          a written report, free.
        </Muted>

        <H2>When to run this</H2>
        <P>
          Once a year, ideally in spring — Colorado&apos;s freeze-thaw cycle does its damage over
          winter, and you want to find what moved before the deck&apos;s busiest season. Run it
          too when you&apos;re buying a house (an unpermitted or failing deck is a classic
          inspection-report surprise), and before any big party puts thirty people on a structure
          built for ten.
        </P>

        <Callout>
          Found something — or just not sure what you&apos;re looking at?{" "}
          <Link href="/contact" className="text-primary font-semibold hover:underline">
            Send us photos
          </Link>{" "}
          and we&apos;ll give you a straight answer, or book a free on-site structural inspection.
          No judgment, no pressure: if the bones are good, we&apos;ll be the first to tell you.
        </Callout>
      </GuideLayout>

      <CtaFinal />
    </>
  );
}
