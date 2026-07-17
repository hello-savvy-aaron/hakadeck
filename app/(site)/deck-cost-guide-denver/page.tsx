import type { Metadata } from "next";
import { CtaFinal } from "@/components/sections/cta-final";
import { GuideLayout } from "@/components/guides/guide-layout";
import { Lead, H2, P, Muted, Callout, StatRows, DataTable, CostBar } from "@/components/guides/guide-content";
import { costGuide } from "@/lib/guides";
import { site } from "@/lib/site";

const title = "What Does a Deck Really Cost? Denver Metro Guide (2026) | Haka Decks";
const description =
  "The honest math behind a deck bid — materials vs. installed cost, add-ons calculators miss, and real installed ranges by size for the south Denver metro. Free PDF.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: costGuide.href },
  openGraph: { title, description, url: `${site.url}${costGuide.href}` },
};

export default function DeckCostGuidePage() {
  return (
    <>
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
          material data plus what installation actually adds.
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

        <H2>The add-ons bids include (and calculators don&apos;t)</H2>
        <StatRows
          rows={[
            { label: "Railing, installed", value: "$20–60 / lin ft" },
            { label: "Stairs, installed", value: "$150–400 / step" },
            { label: "Concrete footings (4–8 per deck)", value: "$150–600 each" },
            { label: "Permit fees, south Denver metro", value: "$200–500" },
            { label: "Tear-out of an old deck", value: "$1,500–3,500" },
          ]}
        />
        <Callout>
          These are planning numbers from national cost surveys and manufacturer calculators — not a
          Haka bid. Elevated decks, walk-outs, and covered structures run above these ranges. When
          you&apos;re ready for a real number, that estimate is free.
        </Callout>
      </GuideLayout>

      <CtaFinal />
    </>
  );
}
