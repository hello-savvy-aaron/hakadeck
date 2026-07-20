import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaFinal } from "@/components/sections/cta-final";
import { GuideLayout } from "@/components/guides/guide-layout";
import { GuideArticleJsonLd } from "@/components/seo/guide-article-jsonld";
import {
  Lead,
  H2,
  P,
  Muted,
  Callout,
  StatRows,
  DataTable,
  CostBar,
  Steps,
} from "@/components/guides/guide-content";
import { costGuide } from "@/lib/guides";
import { site } from "@/lib/site";

const title = "What Does a Deck Really Cost? Denver Metro Guide (2026) | Haka Decks";
const description =
  "The honest math behind a deck bid — installed ranges by size and material, a real bid broken down line by line, the multipliers that move the number, and how to read (and shrink) a quote. Free PDF.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: costGuide.href },
  openGraph: { title, description, url: `${site.url}${costGuide.href}` },
};

export default function DeckCostGuidePage() {
  return (
    <>
      <GuideArticleJsonLd
        title={title}
        description={description}
        path="/deck-cost-guide-denver"
        datePublished="2026-07-17"
        dateModified="2026-07-20"
      />
      <GuideLayout
        guideKey={costGuide.key}
        pdfHref={costGuide.pdf}
        title="The Deck Cost Guide."
        meta={`${costGuide.readLabel} · Updated ${costGuide.updated}`}
        crossLink={{ href: "/composite-vs-hardwood-decking-colorado", label: "Materials guide →" }}
        nextUp={{
          href: "/deck-permits-south-denver-metro",
          label: "Permits & code in the south Denver metro",
        }}
      >
        <Lead>
          Most deck pricing online quotes <strong className="font-semibold">materials only</strong>
          {" — "}then the real bids land at double. Here&apos;s the honest math, using manufacturer
          material data plus what installation actually adds — and further down, a real bid broken
          into line items so you can see where every dollar goes.
        </Lead>

        <H2>Step 1 — Materials</H2>
        <P>
          Composite decking boards (Deckorators, Trex, TimberTech) run roughly{" "}
          <strong className="font-semibold">$8–14 per sq ft</strong> for the boards themselves. Add
          the substructure (pressure-treated framing, footings, hardware) and railing, and all-in
          materials land around <strong className="font-semibold">$20–30 per sq ft</strong> for a
          typical composite deck.
        </P>

        <H2>Step 2 — Add 50–100% for installation</H2>
        <P>
          Industry-wide, labor runs 50–60% of a finished deck&apos;s total cost — professional
          installation adds <strong className="font-semibold">$15–35 per sq ft</strong> on top of
          materials. The rule of thumb: take your materials number and add 50–100%. A $12,000
          materials list is a $18,000–24,000 finished deck. Height, slope, access, and design
          complexity decide which end you land on.
        </P>

        <CostBar
          eyebrow="Where the money actually goes"
          segments={[
            { weight: 38, className: "bg-primary" },
            { weight: 30, className: "bg-primary/50" },
            { weight: 12, className: "bg-haka-sky" },
            { weight: 20, className: "bg-foreground/20" },
          ]}
          caption={
            <>
              Substructure + its labor ~38% · decking &amp; railing labor ~30% · railing material
              ~12% · decking boards &amp; fasteners ~20%. The boards you agonize over are a fifth of
              the bill.
            </>
          }
        />

        <H2>What that means by deck size</H2>
        <Muted>
          Installed composite, single level, with railing — national data; Front Range labor tends
          toward the upper half.
        </Muted>
        <DataTable
          headers={["Size", "Materials", "Installed"]}
          rows={[
            ["12×16 (192 sq ft)", "$4,500 – $6,500", "$8,000 – $13,000"],
            ["16×20 (320 sq ft)", "$7,000 – $10,500", "$13,000 – $25,000"],
            ["20×24 (480 sq ft)", "$10,500 – $15,500", "$19,000 – $37,000"],
          ]}
        />
        <Muted>
          For calibration: the 2025 Zonda Cost vs Value report puts the national-average 16×20
          composite deck addition at about $25,000 — and wood at about $18,000.
        </Muted>

        <H2>What your budget builds</H2>
        <P>
          Numbers anchor better with pictures. Real Haka projects, typical of what each range
          delivers in the Denver metro:
        </P>
        <div className="mb-5 grid gap-3 sm:grid-cols-2">
          {[
            {
              tier: "$8K–15K",
              label: "Single-level composite, simple footprint",
              slug: "prairie-view-deck",
              img: "/images/projects/prairie-view-deck/01.jpeg",
            },
            {
              tier: "$15K–25K",
              label: "Full-size deck, railing & stairs",
              slug: "ranch-deck",
              img: "/images/projects/ranch-drone/02.jpeg",
            },
            {
              tier: "$25K–40K",
              label: "Walk-out height or covered section",
              slug: "walkout-covered-deck",
              img: "/images/projects/walkout-covered-deck/01.jpeg",
            },
            {
              tier: "$40K+",
              label: "Multi-level outdoor living",
              slug: "double-decker",
              img: "/images/projects/double-decker/03.jpeg",
            },
          ].map((t) => (
            <Link
              key={t.slug}
              href={`/portfolio/${t.slug}`}
              className="group border-border overflow-hidden rounded-[10px] border"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={t.img}
                  alt={`${t.label} — Haka Decks project in the ${t.tier} range`}
                  fill
                  sizes="320px"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="px-3 py-2.5">
                <div className="text-foreground text-[13.5px] font-semibold">{t.tier}</div>
                <div className="text-muted-foreground text-[12.5px]">{t.label}</div>
              </div>
            </Link>
          ))}
        </div>
        <Muted>
          Ranges bracket what projects of each shape typically land at — every yard prices
          differently. The calculator gives your number; the{" "}
          <Link href="/portfolio" className="text-primary font-semibold hover:underline">
            portfolio
          </Link>{" "}
          shows what it looks like.
        </Muted>

        <H2>…and by material</H2>
        <P>
          Size sets the scale; the surface you choose sets the rate. Typical installed ranges per
          square foot, Denver metro:
        </P>
        <DataTable
          headers={["Surface", "Installed / sq ft", "The trade"]}
          rows={[
            ["Pressure-treated pine", "$20 – $35", "Cheapest in; staining every 2–3 yrs"],
            ["Cedar / redwood", "$25 – $45", "Real wood look; same upkeep clock"],
            ["Capped composite", "$40 – $70", "No staining, 25–50 yr warranties"],
            ["PVC / mineral board", "$50 – $85", "Top durability, coolest caps"],
          ]}
        />
        <Muted>
          Same substructure under all of them — the framing doesn&apos;t care what you walk on,
          which is why the cheap surface only saves you the board delta, not half the deck. Full
          comparison in the{" "}
          <Link href="/composite-vs-hardwood-decking-colorado" className="text-primary font-semibold hover:underline">
            materials guide
          </Link>
          .
        </Muted>

        <H2>The three multipliers bids get judged on</H2>
        <StatRows
          rows={[
            { label: "Height — walk-out / second story", value: "+20–40%" },
            { label: "Access — tight side yards, no machine access", value: "+10–15%" },
            { label: "Complexity — multi-level, angles, curves", value: "+15–25%" },
          ]}
        />
        <P>
          These stack, and they&apos;re why two 320 sq ft decks can be $14,000 and $27,000 without
          either builder being wrong. An elevated deck is taller posts, engineered footings,
          railing at height, and staging — real structure, not margin. If a bid for a walk-out
          matches a bid for a ground-level deck, one of them misread the job.
        </P>

        <H2>A real bid, line by line</H2>
        <P>
          Here&apos;s what an itemized quote for a common project actually looks like — replacing a
          worn-out 16×20 wood deck with capped composite, mid-height, 36 lin ft of aluminum
          railing, four steps:
        </P>
        <DataTable
          headers={["Line item", "Installed"]}
          cols="1fr auto"
          rows={[
            ["Plans, permit & HOA paperwork", "$900"],
            ["Demo & haul-off of the old deck", "$2,000"],
            ["Footings & posts", "$2,600"],
            ["Framing, ledger & hardware", "$4,900"],
            ["Composite decking, installed", "$4,300"],
            ["Aluminum railing, 36 lin ft", "$2,300"],
            ["Stairs, 4 risers", "$1,100"],
            ["Lighting rough-in & post caps", "$700"],
            ["Total", "$18,800"],
          ]}
        />
        <Muted>
          Landing right in the middle of the 16×20 installed range once tear-out is counted. Yours
          will differ — the point is the shape: if a bid can&apos;t be broken into lines like
          these, you can&apos;t compare it to anything.
        </Muted>

        <H2>The add-ons bids include (and calculators don&apos;t)</H2>
        <StatRows
          rows={[
            { label: "Railing, installed (style decides)", value: "$30–90 / lin ft" },
            { label: "Stairs, installed", value: "$150–400 / step" },
            { label: "Concrete footings (4–8 per deck)", value: "$150–600 each" },
            { label: "Permit fees, south Denver metro", value: "$200–500" },
            { label: "Tear-out of an old deck", value: "$1,500–3,500" },
          ]}
        />

        <H2>The big add-ons</H2>
        <StatRows
          rows={[
            { label: "Pergola over the deck", value: "$6,000–12,000" },
            { label: "Solid-roof cover", value: "$15,000–28,000" },
            { label: "Outdoor kitchen / built-in bar", value: "$8,000–25,000+" },
            { label: "Lighting package", value: "$1,200–3,000" },
          ]}
        />
        <Muted>
          Covers and kitchens are engineered structures with their own permits — priced per
          project, not per square foot. They&apos;re also the classic phase-two items: build the
          deck framed to accept them now, add them next season.
        </Muted>

        <H2>The ten-year math</H2>
        <P>
          Wood wins the day-one bid and loses the decade. A 320 sq ft pressure-treated deck at
          roughly $9,000 wants cleaning and re-staining every other year — $400–900 each round if
          you hire it out — plus board and fastener repairs as UV and freeze-thaw do their work.
          Call it <strong className="font-semibold">$3,000–5,000 over ten years</strong>, on a
          surface that&apos;s aging anyway. The same deck in capped composite at $16,000 needs
          soap, water, and nothing else, with 25–50 year fade-and-stain warranties. The gap
          narrows to a few thousand dollars over a decade — and past year ten, composite is
          simply ahead.
        </P>

        <H2>How to read a bid — the red flags</H2>
        <Steps
          items={[
            <>
              <strong className="font-semibold">One lump-sum number.</strong> If it isn&apos;t
              itemized roughly like the example above, you can&apos;t compare it — and change
              orders have nowhere honest to land.
            </>,
            <>
              <strong className="font-semibold">No footing or hardware spec.</strong> A real bid
              names footing depth and diameter, joist spacing, and the ledger fastening. &quot;Per
              code&quot; with no numbers is a shrug in writing.
            </>,
            <>
              <strong className="font-semibold">Permits are &quot;your problem.&quot;</strong> A
              builder who won&apos;t pull the permit is a builder whose work has never been
              inspected. The permit protects you at resale.
            </>,
            <>
              <strong className="font-semibold">Half down.</strong> A deposit should cover
              materials mobilization, not the whole job&apos;s risk. Colorado norm is a modest
              deposit with payments tied to milestones.
            </>,
            <>
              <strong className="font-semibold">No workmanship warranty in writing.</strong> The
              boards carry 25–50 year manufacturer warranties; ask who stands behind the structure
              underneath, and for how long.
            </>,
          ]}
        />

        <H2>Honest ways to bring the number down</H2>
        <P>
          Keep the footprint a simple rectangle — corners and angles cost framing hours. Stay low
          if the yard allows it; height is the biggest multiplier on the list. Put the premium
          railing on the view side and standard aluminum everywhere else. Pick stock colors
          (special-order boards add cost and weeks). Phase the pergola or kitchen to next year on
          framing that&apos;s ready for them. And time it right — signing in the off-season buys
          schedule flexibility and a spring deck, as our{" "}
          <Link href="/blog/best-time-to-build-deck-colorado" className="text-primary font-semibold hover:underline">
            timing guide
          </Link>{" "}
          lays out. What doesn&apos;t save money: skipping the permit, undersizing footings, or
          reusing framing nobody inspected —{" "}
          <Link href="/services/deck-repair" className="text-primary font-semibold hover:underline">
            re-decking
          </Link>{" "}
          over sound framing is the legitimate version of that shortcut.
        </P>

        <Callout>
          These are planning numbers from national cost surveys and manufacturer calculators — not
          a Haka bid. Elevated decks, walk-outs, and covered structures run above these ranges.
          Want to play with your own numbers first? The{" "}
          <Link href="/deck-cost-calculator" className="text-primary font-semibold hover:underline">
            cost calculator
          </Link>{" "}
          takes thirty seconds. When you&apos;re ready for a real number, that estimate is free.
        </Callout>
      </GuideLayout>

      <CtaFinal />
    </>
  );
}
