import type { Metadata } from "next";
import { CtaFinal } from "@/components/sections/cta-final";
import { GuideLayout } from "@/components/guides/guide-layout";
import { GuideArticleJsonLd } from "@/components/seo/guide-article-jsonld";
import Link from "next/link";
import {
  Lead,
  H2,
  P,
  Muted,
  Callout,
  StatRows,
  DataTable,
  Steps,
} from "@/components/guides/guide-content";
import { guideBySlug } from "@/lib/guides";
import { site } from "@/lib/site";

const guide = guideBySlug("deck-permits-south-denver-metro")!;

const title = "Deck Permits & Code — South Denver Metro (2026) | Haka Decks";
const description =
  "When you need a deck permit in the south Denver metro, what the process involves, the code numbers that trip people up, and where to file by city. Free PDF.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: guide.href },
  openGraph: { title, description, url: `${site.url}${guide.href}` },
};

export default function PermitsGuidePage() {
  return (
    <>
      <GuideArticleJsonLd
        title={title}
        description={description}
        path="/deck-permits-south-denver-metro"
        datePublished="2026-07-17"
        dateModified="2026-07-20"
      />
      <GuideLayout
        guideKey={guide.key}
        pdfHref={guide.pdf!}
        title="Deck Permits & Code, South Denver Metro."
        meta={`${guide.readLabel} · Updated ${guide.updated}`}
        crossLink={{ href: "/diy-deck-building-checklist", label: "DIY checklist →" }}
        nextUp={{ href: "/deck-cost-guide-denver", label: "What does a deck really cost?" }}
      >
        <Lead>
          Almost every deck we build needs a permit. The rule of thumb across the south metro: if
          it&apos;s attached to the house, more than 30&quot; above grade, or over ~200 sq ft,
          you&apos;re pulling one. Here&apos;s what that actually involves.
        </Lead>

        <H2>What the permit process looks like</H2>
        <Steps
          items={[
            <>
              <strong className="font-semibold">Site plan.</strong> Your lot with the deck drawn in —
              setbacks from property lines matter most (usually 5–15 ft rear, varies by zone and
              HOA).
            </>,
            <>
              <strong className="font-semibold">Framing plan.</strong> Footings, posts, beams,
              joists, ledger attachment, railing height. Front Range frost depth means footings go
              30–36&quot; down — Douglas County reviewers expect the full 36&quot;, while most
              Arapahoe County jurisdictions accept 30&quot;.
            </>,
            <>
              <strong className="font-semibold">Submit &amp; wait.</strong> Most south-metro cities
              turn residential deck permits around in 1–3 weeks. Fees typically run $150–500.
            </>,
            <>
              <strong className="font-semibold">Inspections.</strong> Usually three: footing holes
              (before concrete), rough framing, and final. Miss one and you may be digging things
              back up.
            </>,
          ]}
        />

        <H2>Code numbers that trip people up</H2>
        <StatRows
          rows={[
            { label: "Guardrail required above grade", value: '30"' },
            { label: "Minimum residential guardrail height", value: '36"' },
            { label: 'Max gap in railing (the "4-inch sphere" rule)', value: '< 4"' },
            { label: "Stair rise / run limits", value: '7¾" / 10"' },
            { label: "Stair handrail height", value: '34–38"' },
            { label: "Guardrail design load, any direction", value: "200 lb" },
            { label: "Footing depth (frost line, Front Range)", value: '30–36"' },
          ]}
        />

        <H2>Where to file, by city</H2>
        <P>
          Centennial, Greenwood Village, Cherry Hills Village, Lone Tree, and Castle Rock file with
          their own building departments. Highlands Ranch is unincorporated — permits go through{" "}
          <strong className="font-semibold">Douglas County</strong>, and the HRCA wants its
          architectural review done before you submit. Unincorporated Arapahoe County addresses
          file with the county. Every jurisdiction wants HOA sign-off first if you have one —
          check that before drawing anything.
        </P>
        <DataTable
          headers={["Where you file", "Typical review", "Typical fees"]}
          rows={[
            ["Centennial", "1–2 weeks", "$150–350"],
            ["Greenwood Village", "1–2 weeks", "$150–350"],
            ["Lone Tree", "2–3 weeks", "$200–400"],
            ["Castle Rock", "2–3 weeks", "$200–450"],
            ["Douglas County (Highlands Ranch)", "2–3 weeks", "$200–500"],
            ["Arapahoe County (unincorporated)", "2–3 weeks", "$150–400"],
          ]}
        />
        <Muted>
          Fees are valuation-based, so a bigger deck files higher; re-review after corrections and
          HOA fees are extra. Ranges reflect typical single-family deck permits in 2026 — the fee
          shows up as a line item in an honest bid, as the{" "}
          <Link href="/deck-cost-guide-denver" className="text-primary font-semibold hover:underline">
            cost guide
          </Link>{" "}
          shows.
        </Muted>
        <Callout>
          Codes change, cities amend them, and fee schedules get updated. Treat this as
          orientation, and confirm specifics with your building department — or have us pull the
          permit; it&apos;s included in{" "}
          <Link href="/process" className="text-primary font-semibold hover:underline">
            every Haka build
          </Link>
          .
        </Callout>
      </GuideLayout>

      <CtaFinal />
    </>
  );
}
