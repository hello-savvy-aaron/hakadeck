import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Eyebrow, Section, SectionHeading } from "@/components/sections/section";
import { CtaFinal } from "@/components/sections/cta-final";
import { ProofBadge } from "@/components/sections/review-quotes";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-jsonld";
import { FaqJsonLd } from "@/components/seo/faq-jsonld";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import type { Faq } from "@/lib/faqs";

const title = "TimberTech Deck Builder in Denver, CO — Authorized Dealer | Haka Decks";
const description =
  "Haka Decks is an authorized TimberTech dealer building TimberTech composite and AZEK PVC decks across the Denver metro — lines, warranties, and honest installed pricing.";

// Rendered below AND fed to FaqJsonLd — schema must match visible copy.
const FAQS: Faq[] = [
  {
    q: "What's the difference between TimberTech composite and AZEK?",
    a: "TimberTech PRO and EDGE are capped wood-polymer composites — excellent boards with 30-year fade-and-stain warranties. AZEK is TimberTech's fully synthetic PVC line: no wood content at all, a lifetime limited structural warranty, 50-year fade-and-stain coverage, and the lightest, most moisture-immune board in their lineup. AZEK costs more; for rooftop decks, full-sun walk-outs, and anywhere moisture or weight matters, it earns it.",
  },
  {
    q: "When do you recommend TimberTech over other brands?",
    a: "When its lineup fits the project. TimberTech's color and grain collections are genuinely distinctive — some of the most convincing wood looks in the industry — and AZEK is one of the strongest PVC boards made, which matters for premium builds where total moisture immunity is worth paying for. We install Trex and Deckorators too, and we'll tell you honestly which fits your yard; the sample box comes to every consultation.",
  },
  {
    q: "What warranty comes with a TimberTech deck?",
    a: "PRO and EDGE composite lines carry 30-year limited structural and fade-and-stain warranties; AZEK PVC carries a lifetime limited structural warranty with 50-year fade-and-stain coverage. TimberTech's labor coverage runs 5 to 25 years depending on the installing contractor's program tier. On top of all of it sits our own 2-year written workmanship warranty — and we run any claim for you end to end.",
  },
  {
    q: "How much does a TimberTech deck cost installed in Denver?",
    a: "PRO and EDGE composite builds land in the same $40–$70 per square foot installed range as the other capped composites we build. AZEK PVC runs above that, typically $50–$85 per square foot installed — a typical 300–400 square foot AZEK deck lands roughly $20,000–$34,000 with stairs, railing, and permits. Every estimate is itemized so you can see exactly what the board is worth.",
  },
];

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/timbertech-deck-builder-denver" },
  openGraph: { title, description, url: `${site.url}/timbertech-deck-builder-denver` },
};

export default function TimberTechPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "TimberTech Deck Builder", path: "/timbertech-deck-builder-denver" }]}
      />
      <FaqJsonLd faqs={FAQS} />

      <Section top="loose" bottom="tight">
        <Eyebrow>TimberTech Authorized Dealer</Eyebrow>
        <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.03] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
          TimberTech decks, from composite to full PVC.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
          As an authorized TimberTech dealer we build the full lineup — PRO and EDGE capped
          composite, and AZEK, the fully synthetic PVC board that goes where wood-based
          composites shouldn&apos;t.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button asChild size="lg" className="h-12 px-6 text-base">
            <Link href={site.cta.href}>
              {site.cta.label}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
          <ProofBadge />
        </div>
      </Section>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="border-border/40 relative aspect-[16/9] overflow-hidden rounded-2xl border">
          <Image
            src="/images/projects/walkout-covered-deck/02.jpeg"
            alt="Covered composite deck built by Haka Decks, an authorized TimberTech dealer serving the Denver metro"
            fill
            priority
            sizes="1100px"
            className="object-cover"
          />
        </div>
      </div>

      <Section top="tight" bottom="tight">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <Eyebrow>Two materials, one brand</Eyebrow>
            <SectionHeading className="mt-4 text-3xl sm:text-4xl">
              Composite when it fits. PVC when it matters.
            </SectionHeading>
          </div>
          <div className="text-muted-foreground space-y-4 text-base leading-relaxed">
            <p>
              <span className="text-foreground font-medium">PRO and EDGE</span> are
              TimberTech&apos;s capped composites — wood-polymer boards with some of the most
              convincing grain and color work in the industry, backed by 30-year fade-and-stain
              warranties. They compete directly with the Trex and Deckorators lines we also
              install, and on pure looks they win some head-to-heads at the sample table.
            </p>
            <p>
              <span className="text-foreground font-medium">AZEK</span> is the different animal:
              fully synthetic PVC with no wood content anywhere in the board. Nothing to absorb
              moisture, nothing to feed mold, and the lightest weight-per-foot of anything we
              install — which is why it&apos;s our spec for rooftop decks, full-sun walk-outs,
              and premium builds where total moisture immunity is worth the step up. It carries a
              lifetime limited structural warranty and 50-year fade-and-stain coverage, the
              longest paper in the industry.
            </p>
            <p>
              Where each line actually wins — and where a competitor beats it — is covered
              honestly in our{" "}
              <Link href="/blog/trex-vs-timbertech-vs-fiberon" className="text-foreground font-medium underline underline-offset-3 hover:no-underline">
                installer&apos;s brand comparison
              </Link>{" "}
              and the{" "}
              <Link href="/blog/haka-warranties-guide" className="text-foreground font-medium underline underline-offset-3 hover:no-underline">
                warranty guide
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      <Section top="tight" bottom="tight">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <Eyebrow>Built for here</Eyebrow>
            <SectionHeading className="mt-4 text-3xl sm:text-4xl">
              The same engineering under every brand.
            </SectionHeading>
          </div>
          <div className="text-muted-foreground space-y-4 text-base leading-relaxed">
            <p>
              Whatever board goes on top, the structure underneath is what decides how the deck
              handles Colorado: engineered framing sized for snow load, footings below the frost
              line, gapping and fastening set to the manufacturer&apos;s spec for our temperature
              swings, and ledger flashing detailed for freeze-thaw. That&apos;s how the
              30-year-to-lifetime paper stays enforceable — and it&apos;s all covered by{" "}
              <Link href="/warranty" className="text-foreground font-medium underline underline-offset-3 hover:no-underline">
                our own written guarantee
              </Link>{" "}
              regardless of brand.
            </p>
            <p>
              Run your numbers in the{" "}
              <Link href="/deck-cost-calculator" className="text-foreground font-medium underline underline-offset-3 hover:no-underline">
                cost calculator
              </Link>
              , see finished work in the{" "}
              <Link href="/portfolio" className="text-foreground font-medium underline underline-offset-3 hover:no-underline">
                portfolio
              </Link>
              , or read how we build on the{" "}
              <Link href="/services/composite-decks" className="text-foreground font-medium underline underline-offset-3 hover:no-underline">
                composite decks page
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      <Section top="none" bottom="tight">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <h2 className="font-display text-2xl leading-tight font-medium tracking-tight sm:text-3xl">
              TimberTech questions, answered straight.
            </h2>
          </div>
          <div className="w-full">
            {FAQS.map((item, i) => (
              <details key={i} className="group border-border/40 not-last:border-b">
                <summary className="font-display flex cursor-pointer list-none items-start justify-between gap-3 rounded-lg py-2.5 text-left text-lg font-medium tracking-tight hover:underline sm:text-xl [&::-webkit-details-marker]:hidden">
                  {item.q}
                </summary>
                <p className="text-muted-foreground pb-3 text-base leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <CtaFinal />
    </>
  );
}
