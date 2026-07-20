import type { Metadata } from "next";
import Link from "next/link";
import { CtaFinal } from "@/components/sections/cta-final";
import { GuideLayout } from "@/components/guides/guide-layout";
import { Lead, H2, P, Muted, Callout, DataTable } from "@/components/guides/guide-content";
import { GuideArticleJsonLd } from "@/components/seo/guide-article-jsonld";
import { FaqJsonLd } from "@/components/seo/faq-jsonld";
import { guideBySlug } from "@/lib/guides";
import { site } from "@/lib/site";
import type { Faq } from "@/lib/faqs";

const guide = guideBySlug("composite-vs-hardwood-decking-colorado")!;

const title = "Composite vs. Hardwood Decking in Colorado (2026) | Haka Decks";
const description =
  "Composite vs. hardwood decking at Colorado altitude — installed cost, upkeep, lifespan, and how each handles UV, hail, and freeze-thaw. The honest comparison, free PDF.";

// Q&A rendered below AND fed to FaqJsonLd — the two must stay identical
// (Google requires schema text to match the visible copy).
const FAQS: Faq[] = [
  {
    q: "Is composite decking worth it at Colorado altitude?",
    a: "Usually, yes — altitude is exactly where composite earns its premium. At 5,000+ feet our UV is roughly 25% stronger than sea level, which is what fades and dries out wood finishes so fast here. A capped composite board carries a 25–50 year fade and stain warranty instead of an annual refinishing clock, so the harder your deck's sun exposure, the stronger the case.",
  },
  {
    q: "How much more does composite cost than cedar?",
    a: "Plan on roughly $10–25 more per square foot installed: cedar and redwood run about $25–45 per square foot in the Denver area, capped composite about $40–70. Over a decade the gap narrows — cedar wants a clean-and-restain every year or two at $400–900 a round if you hire it out, while composite's maintenance budget is a bottle of deck soap.",
  },
  {
    q: "Does composite get too hot in the Colorado sun?",
    a: "Dark composite in full July sun does get warmer than wood — it's the honest trade-off. It's also solvable: lighter colors run cooler, mineral-based boards like Deckorators shed heat noticeably better than wood-flour composites, and a pergola over the hottest exposure fixes it completely. We factor sun orientation into every design.",
  },
];

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: guide.href },
  openGraph: { title, description, url: `${site.url}${guide.href}` },
};

export default function MaterialsGuidePage() {
  return (
    <>
      <GuideArticleJsonLd
        title={title}
        description={description}
        path={guide.href}
        datePublished="2026-07-17"
        dateModified="2026-07-20"
      />
      <FaqJsonLd faqs={FAQS} />
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
          Short version: composite costs more per board and less per decade. Hardwood looks and
          feels like nothing else — if you&apos;ll actually maintain it. Here&apos;s how they
          compare at Colorado altitude, where UV and freeze-thaw cycles punish both, and how to
          pick for your specific yard rather than in the abstract.
        </Lead>

        <div className="mt-5">
          <DataTable
            headers={["", "Composite", "Hardwood"]}
            rows={[
              ["Installed cost", "$40–70 / sq ft", "$50–85 / sq ft"],
              ["Annual upkeep", "Soap and water", "Clean, sand spots, re-oil every 1–2 yrs"],
              ["Lifespan", "25–50 yrs (warrantied)", "20–40 yrs (maintained)"],
              ["Colorado UV", "Fade-warrantied caps", "Silvers fast without oil"],
              ["Hail", "Cap resists pitting", "Dents; refinish hides it"],
              ["Feel underfoot", "Warmer in full sun", "Cooler, real wood grain"],
            ]}
          />
        </div>
        <Muted>
          Installed ranges for the Denver metro; the same engineered substructure sits under
          either surface. Full pricing math lives in the{" "}
          <Link href="/deck-cost-guide-denver" className="text-primary font-semibold hover:underline">
            cost guide
          </Link>
          .
        </Muted>

        <H2>What Colorado actually does to a deck</H2>
        <P>
          This comparison reads differently at 5,800 feet than it does in a national buying guide.
          Three things do most of the damage here. <strong className="font-semibold">UV</strong>:
          our sun is roughly 25% stronger than sea level, and it bleaches stain and dries wood
          fibers until boards check and split. <strong className="font-semibold">Freeze-thaw</strong>:
          thirty-degree daily swings in spring and fall work moisture in and out of wood, backing
          fasteners out and opening end-grain. <strong className="font-semibold">Hail</strong>:
          the Front Range sits in one of the most hail-prone corridors in the country, and soft,
          finished surfaces show every strike. Composite&apos;s polymer cap was effectively
          designed for this checklist — which is why about 90% of what we build is composite. The
          other 10% is homeowners who want real wood badly enough to care for it, and that&apos;s
          a legitimate choice when it&apos;s made with open eyes.
        </P>

        <H2>Pick composite if…</H2>
        <P>
          You want weekends on the deck, not maintaining it. Modern capped boards (Trex,
          TimberTech, Deckorators — we install all three; our{" "}
          <Link href="/blog/trex-vs-timbertech-vs-fiberon" className="text-primary font-semibold hover:underline">
            installer&apos;s brand comparison
          </Link>{" "}
          covers which line fits which project) carry real 25–50 year fade and stain warranties.
          Unlike the first-generation composites from twenty years ago, today&apos;s boards
          don&apos;t gray out, don&apos;t grow mold in shaded corners, and never see sandpaper.
          Composite is also the default answer for elevated and walk-out decks — surfaces you
          really don&apos;t want to be refinishing off a ladder.
        </P>

        <H2>Pick hardwood if…</H2>
        <P>
          Nothing else will do. Ipe, cumaru, and garapa are gorgeous, dense, and cooler underfoot,
          and clear-grade cedar has a warmth composite still can&apos;t fake. The honest trade:
          budget a re-oil every year or two, or accept the silver-gray patina. Skip the middle
          ground — a neglected hardwood deck costs more to rescue than it did to build. If you go
          wood, the build details carry the weight: hidden fasteners, sealed end-grain, gapping
          sized for our dry air. That&apos;s covered on our{" "}
          <Link href="/services/hardwood-cedar-decks" className="text-primary font-semibold hover:underline">
            hardwood &amp; cedar page
          </Link>
          , along with the annual maintenance plans we offer if you&apos;d rather hand us the oiling.
        </P>

        <H2>What about redwood or cedar?</H2>
        <P>
          The budget-friendly classic. Lower upfront cost ($25–45 / sq ft installed), but softer
          boards and yearly staining in our climate. Fine for ground-level decks you plan to
          replace in 15–20 years; we&apos;d steer walk-outs and high decks to composite.
        </P>

        <H2>The wildcards: PVC, mineral board, and modified wood</H2>
        <P>
          Two more options bracket the composite range. On the premium end, PVC and mineral-based
          boards ($50–85 / sq ft installed) are the most weather-proof surfaces made — fully
          synthetic or mineral-cored, with the coolest-running caps and the longest warranties;
          they&apos;re what we spec for full-sun walk-outs and rooftop decks. And on the wood side,
          thermally-modified ash splits the difference: real wood that&apos;s been kiln-treated for
          dimensional stability, so it rides out our freeze-thaw cycle far better than untreated
          hardwood while keeping genuine grain underfoot.
        </P>

        <H2>The ten-year math</H2>
        <P>
          Day one, wood wins the invoice. Year ten is a different story: a wood deck that&apos;s
          been professionally cleaned and re-stained every other year has quietly spent
          $3,000–5,000 on upkeep — while fighting fade the whole time — and composite has spent
          roughly nothing. Past year ten, composite is simply ahead, which is why we describe the
          choice as paying for the maintenance up front versus paying for it forever. Either way,
          the substructure should outlast the surface: same engineered framing, footings below
          frost line, and{" "}
          <Link href="/deck-permits-south-denver-metro" className="text-primary font-semibold hover:underline">
            permits
          </Link>{" "}
          handled regardless of what you walk on.
        </P>

        <H2>Quick answers</H2>
        <div className="mt-3 mb-5">
          {FAQS.map((f, i) => (
            <details key={i} className="group border-border/60 not-last:border-b">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-3 py-2.5 text-[14px] font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="text-muted-foreground mt-0.5 text-xs group-open:hidden">+</span>
                <span className="text-muted-foreground mt-0.5 hidden text-xs group-open:inline">−</span>
              </summary>
              <p className="text-muted-foreground pb-3 text-[13.5px] leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>

        <Callout>
          Still on the fence? We keep samples of every line we install — composite, PVC, cedar,
          and hardwood — and a{" "}
          <Link href="/contact" className="text-primary font-semibold hover:underline">
            free on-site consultation
          </Link>{" "}
          puts them in your actual light, against your actual house. That settles it faster than
          any comparison table, including this one. Deck near{" "}
          <Link href="/locations/centennial" className="text-primary font-semibold hover:underline">
            Centennial
          </Link>
          ? We&apos;re neighbors.
        </Callout>
      </GuideLayout>

      <CtaFinal />
    </>
  );
}
