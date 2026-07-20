import type { Metadata } from "next";
import { CtaFinal } from "@/components/sections/cta-final";
import { GuideLayout } from "@/components/guides/guide-layout";
import { Lead, H2, P, DataTable } from "@/components/guides/guide-content";
import { guideBySlug } from "@/lib/guides";
import { site } from "@/lib/site";

const guide = guideBySlug("composite-vs-hardwood-decking-colorado")!;

const title = "Composite vs. Hardwood Decking in Colorado (2026) | Haka Decks";
const description =
  "Composite vs. hardwood decking at Colorado altitude — installed cost, upkeep, lifespan, and how each handles UV and freeze-thaw. The honest comparison, free PDF.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: guide.href },
  openGraph: { title, description, url: `${site.url}${guide.href}` },
};

export default function MaterialsGuidePage() {
  return (
    <>
      <GuideLayout
        guideKey={guide.key}
        pdfHref={guide.pdf!}
        title="Composite vs. Hardwood Decking."
        meta={`${guide.readLabel} · Updated ${guide.updated}`}
        crossLink={{ href: "/deck-cost-guide-denver", label: "See the cost guide →" }}
        nextUp={{
          href: "/deck-permits-south-denver-metro",
          label: "Permits & code in the south Denver metro",
        }}
      >
        <Lead>
          Short version: composite costs more per board and less per decade. Hardwood looks and feels
          like nothing else — if you&apos;ll actually maintain it. Here&apos;s how they compare at
          Colorado altitude, where UV and freeze-thaw cycles punish both.
        </Lead>

        <div className="mt-5">
          <DataTable
            headers={["", "Composite", "Hardwood"]}
            rows={[
              ["Installed cost", "$40–70 / sq ft", "$50–85 / sq ft"],
              ["Annual upkeep", "Soap and water", "Clean, sand spots, re-oil every 1–2 yrs"],
              ["Lifespan", "25–50 yrs (warrantied)", "20–40 yrs (maintained)"],
              ["Colorado UV", "Fade-warrantied caps", "Silvers fast without oil"],
              ["Feel underfoot", "Warmer in full sun", "Cooler, real wood grain"],
            ]}
          />
        </div>

        <H2>Pick composite if…</H2>
        <P>
          You want weekends on the deck, not maintaining it. Modern capped boards (Trex, TimberTech,
          Deckorators — we install all three) have real 25–50 year fade and stain warranties, and at
          5,000+ ft that matters: our UV is roughly 25% stronger than sea level. About 90% of what we
          build is composite.
        </P>

        <H2>Pick hardwood if…</H2>
        <P>
          Nothing else will do. Ipe and cumaru are gorgeous, dense, and cooler underfoot. The honest
          trade: budget a re-oil every year or two, or accept the silver-gray patina. Skip the middle
          ground — a neglected hardwood deck costs more to rescue than it did to build.
        </P>

        <H2>What about redwood or cedar?</H2>
        <P>
          The budget-friendly classic. Lower upfront cost ($25–45 / sq ft installed), but softer
          boards and yearly staining in our climate. Fine for ground-level decks you plan to replace
          in 15–20 years; we&apos;d steer walk-outs and high decks to composite.
        </P>
      </GuideLayout>

      <CtaFinal />
    </>
  );
}
