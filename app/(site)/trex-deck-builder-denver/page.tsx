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

const title = "Trex Deck Builder in Denver, CO — Platinum Pro Contractor | Haka Decks";
const description =
  "Haka Decks is a Trex Platinum Pro contractor — the brand's top installer tier — building Trex composite decks across the Denver metro. Lines, warranties, and real installed pricing.";

// Rendered below AND fed to FaqJsonLd — schema must match visible copy.
const FAQS: Faq[] = [
  {
    q: "What does Trex Platinum Pro actually mean?",
    a: "It's the top tier of Trex's installer program — awarded on installation volume and quality standards, not purchased. For you it means the crew building your deck installs Trex to the manufacturer's own specification, which is what keeps the 25-to-50-year material warranties clean, and that a manufacturer-recognized contractor stands behind the install alongside our own 2-year written workmanship warranty.",
  },
  {
    q: "Which Trex lines do you install?",
    a: "All of the current ones. Trex Enhance Naturals is the value entry with a 25-year warranty; Transcend and Transcend Lineage are the flagship boards with 50-year fade-and-stain coverage and the deepest color range; Signature sits at the premium end, pairing 50-year coverage with the longest labor terms in the lineup. We keep samples of every line and will tell you honestly which tier your project actually needs — often it isn't the most expensive one.",
  },
  {
    q: "How much does a Trex deck cost installed in Denver?",
    a: "The same $40–$70 per square foot installed range as other capped composites we build — a typical 300–400 square foot Trex deck lands around $15,000–$30,000 with stairs, railing, and permits included. Board tier moves the number within that range: Enhance keeps projects near the bottom, Transcend and Signature push toward the top. Every estimate is itemized so you can see exactly what the board choice is worth.",
  },
  {
    q: "Is Trex the best composite for Colorado?",
    a: "It's one of three we'd put on the table, and the honest answer depends on your yard. Trex has the widest color range and strong value at the entry tier. For full-sun exposures we often steer toward Deckorators, whose mineral-based boards run cooler and move less through Colorado's big temperature swings — we hold that brand's top certification too. The right way to decide is samples on your actual deck site, in your actual light, and we bring them.",
  },
];

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/trex-deck-builder-denver" },
  openGraph: { title, description, url: `${site.url}/trex-deck-builder-denver` },
};

export default function TrexPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Trex Deck Builder", path: "/trex-deck-builder-denver" }]} />
      <FaqJsonLd faqs={FAQS} />

      <Section top="loose" bottom="tight">
        <Eyebrow>Trex Platinum Pro</Eyebrow>
        <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.03] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Trex deck builder in Denver — at the brand&apos;s top installer tier.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
          Anyone can buy Trex boards. Platinum Pro status is Trex&apos;s own recognition of how a
          contractor installs them — and it&apos;s the difference between a deck that merely uses
          the brand and one the manufacturer stands behind.
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
            src="/images/projects/ranch-drone/04.jpeg"
            alt="Capped composite deck built by Haka Decks, a Trex Platinum Pro contractor in the Denver metro"
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
            <Eyebrow>The lineup</Eyebrow>
            <SectionHeading className="mt-4 text-3xl sm:text-4xl">
              Every Trex line, and which one your project actually needs.
            </SectionHeading>
          </div>
          <div className="text-muted-foreground space-y-4 text-base leading-relaxed">
            <p>
              <span className="text-foreground font-medium">Enhance Naturals</span> is the value
              entry — a genuine capped board with a 25-year fade-and-stain warranty that keeps a
              full build near the bottom of the composite price range.{" "}
              <span className="text-foreground font-medium">Transcend and Transcend Lineage</span>{" "}
              are the flagship: deeper grain, the widest color range in the industry, and 50-year
              coverage. <span className="text-foreground font-medium">Signature</span> sits at the
              premium end with 50-year coverage and the longest labor-warranty terms in the Trex
              lineup — the line for a deck you intend to be the last one you build.
            </p>
            <p>
              We keep samples of all of them, and our advice is frequently that a project
              doesn&apos;t need the top tier — an Enhance deck on properly engineered framing will
              outlast a premium board on a bad structure every time. The full brand-by-brand
              warranty math, including what &ldquo;50-year&rdquo; actually pays in year 30, is in
              our{" "}
              <Link href="/blog/haka-warranties-guide" className="text-foreground font-medium underline underline-offset-3 hover:no-underline">
                plain-English warranty guide
              </Link>
              , and our{" "}
              <Link href="/blog/trex-vs-timbertech-vs-fiberon" className="text-foreground font-medium underline underline-offset-3 hover:no-underline">
                installer&apos;s comparison of the major brands
              </Link>{" "}
              plays every manufacturer straight.
            </p>
          </div>
        </div>
      </Section>

      <Section top="tight" bottom="tight">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <Eyebrow>Why the installer matters</Eyebrow>
            <SectionHeading className="mt-4 text-3xl sm:text-4xl">
              The board is warrantied. The build is on us.
            </SectionHeading>
          </div>
          <div className="text-muted-foreground space-y-4 text-base leading-relaxed">
            <p>
              Trex warranties the boards — against fading, staining, and manufacturing defects,
              for decades. What the warranty doesn&apos;t cover is the structure underneath: the
              footings, the framing, the ledger connection, the gapping and fastening the install
              spec requires. That&apos;s the part that actually decides how a Colorado deck ages,
              because our altitude UV, hail, and freeze-thaw work on the structure as hard as the
              surface. Every Trex deck we build sits on engineered framing with footings below
              frost line, hidden fasteners per spec, and gapping set for the temperature the day
              we install — the details that keep the warranty clean and the deck flat.
            </p>
            <p>
              And behind Trex&apos;s coverage sits{" "}
              <Link href="/warranty" className="text-foreground font-medium underline underline-offset-3 hover:no-underline">
                our own guarantee
              </Link>
              : two years on workmanship in writing, honored longer in practice. One call starts
              any claim — we run it end to end, whether it&apos;s a board issue for Trex or a
              build issue on us.
            </p>
            <p>
              Want the planning numbers first? The{" "}
              <Link href="/deck-cost-calculator" className="text-foreground font-medium underline underline-offset-3 hover:no-underline">
                cost calculator
              </Link>{" "}
              gives you a range in thirty seconds, and our{" "}
              <Link href="/services/composite-decks" className="text-foreground font-medium underline underline-offset-3 hover:no-underline">
                composite deck page
              </Link>{" "}
              covers how we build every brand we install.
            </p>
          </div>
        </div>
      </Section>

      <Section top="none" bottom="tight">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <h2 className="font-display text-2xl leading-tight font-medium tracking-tight sm:text-3xl">
              Trex questions, answered straight.
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
