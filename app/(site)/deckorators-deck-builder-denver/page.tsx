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

const title = "Deckorators Deck Builder in Denver, CO — Certified Pro Elite | Haka Decks";
const description =
  "Haka Decks is a Deckorators Certified Pro Elite installer — and Deckorators mineral-based composite is our first recommendation for most Colorado decks. Here's why, with real installed pricing.";

// Rendered below AND fed to FaqJsonLd — schema must match visible copy.
const FAQS: Faq[] = [
  {
    q: "Why is Deckorators your go-to composite brand?",
    a: "Because of what Colorado does to a deck. Deckorators' mineral-based composite runs cooler underfoot in full sun and expands and contracts less through our thirty-degree spring and fall temperature swings than wood-flour composites — the two complaints we hear most about composite at altitude. It's the board we recommend first for most Front Range yards, and we hold the brand's Certified Pro Elite installer status.",
  },
  {
    q: "What is mineral-based composite?",
    a: "Most composite boards are a wood-flour-and-plastic blend. Deckorators' Surestone core replaces the wood content with a mineral composite instead — so there's nothing organic in the core to absorb moisture, swell, or feed mold. The practical results: dramatically less expansion and contraction, no moisture uptake even in ground contact, and a board light and stable enough that Deckorators warranties some lines for water immersion. In a freeze-thaw climate, a core that doesn't take on water is the whole game.",
  },
  {
    q: "What warranty comes with a Deckorators deck?",
    a: "The Voyage and Vault lines we install most carry a 50-year structural warranty and 25-year fade-and-stain coverage, with the first 5 years including labor. Behind that sits our own 2-year written workmanship warranty on the build itself — and one call to us starts any claim, manufacturer or otherwise. The full brand-by-brand warranty math is in our plain-English warranty guide.",
  },
  {
    q: "How much does a Deckorators deck cost installed in Denver?",
    a: "The same $40–$70 per square foot installed range as the other capped composites we build — a typical 300–400 square foot deck lands around $15,000–$30,000 with stairs, railing, and permits included. Voyage's deep-grain boards sit toward the middle of the range; every estimate we send is itemized so you can see exactly what the board choice is worth.",
  },
];

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/deckorators-deck-builder-denver" },
  openGraph: { title, description, url: `${site.url}/deckorators-deck-builder-denver` },
};

export default function DeckoratorsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Deckorators Deck Builder", path: "/deckorators-deck-builder-denver" }]}
      />
      <FaqJsonLd faqs={FAQS} />

      <Section top="loose" bottom="tight">
        <Eyebrow>Deckorators Certified Pro Elite</Eyebrow>
        <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.03] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
          The board we&apos;d put on our own houses.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
          We install every major composite brand, and Deckorators is the one we recommend first
          for most Colorado yards — cooler in full sun, more stable through big temperature
          swings, and backed by our Certified Pro Elite installer status with the brand.
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
            src="/images/projects/double-decker/03.jpeg"
            alt="Two-tier composite deck built by Haka Decks, a Deckorators Certified Pro Elite installer in Centennial"
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
            <Eyebrow>The mineral difference</Eyebrow>
            <SectionHeading className="mt-4 text-3xl sm:text-4xl">
              A core with no wood in it, in a climate that punishes wood.
            </SectionHeading>
          </div>
          <div className="text-muted-foreground space-y-4 text-base leading-relaxed">
            <p>
              Most composite decking is a wood-flour-and-polymer blend — good boards, but the
              wood content still absorbs a little moisture and still moves with temperature.
              Deckorators&apos; Surestone core swaps the wood for mineral composite. Nothing in
              the core absorbs water, swells, or feeds mold, which is precisely the failure
              mode Colorado&apos;s freeze-thaw cycle hunts for. The boards run measurably cooler
              underfoot in July sun and move far less across our thirty-degree spring days —
              the two things people actually notice about a composite deck after the first year.
            </p>
            <p>
              That&apos;s why Voyage and Vault are our default recommendation on unshaded
              south- and west-facing decks, walk-outs, and the open lots where sun exposure is
              the whole design problem. On a shaded lot where heat matters less, we&apos;ll say
              so — our{" "}
              <Link href="/blog/trex-vs-timbertech-vs-fiberon" className="text-foreground font-medium underline underline-offset-3 hover:no-underline">
                brand comparison
              </Link>{" "}
              treats every manufacturer honestly, and the sample box comes to every consultation.
            </p>
          </div>
        </div>
      </Section>

      <Section top="tight" bottom="tight">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <Eyebrow>Pro Elite, in practice</Eyebrow>
            <SectionHeading className="mt-4 text-3xl sm:text-4xl">
              What the certification buys you.
            </SectionHeading>
          </div>
          <div className="text-muted-foreground space-y-4 text-base leading-relaxed">
            <p>
              Certified Pro Elite is Deckorators&apos; top installer designation — training,
              install-spec compliance, and a track record with the brand, not a sticker. It means
              the crew on your deck installs the board the way the manufacturer engineered it to
              be installed: correct gapping for our temperature swings, the right fasteners, and
              framing details that keep the 50-year structural and 25-year fade-and-stain
              warranties clean, with the first five years covering labor too.
            </p>
            <p>
              Under every board is the same structure we build for every brand: engineered
              framing, footings below frost line, and{" "}
              <Link href="/warranty" className="text-foreground font-medium underline underline-offset-3 hover:no-underline">
                our written guarantee
              </Link>{" "}
              on all of it. Start with the{" "}
              <Link href="/deck-cost-calculator" className="text-foreground font-medium underline underline-offset-3 hover:no-underline">
                cost calculator
              </Link>{" "}
              for a planning range, or see the{" "}
              <Link href="/portfolio" className="text-foreground font-medium underline underline-offset-3 hover:no-underline">
                portfolio
              </Link>{" "}
              for what the finished work looks like.
            </p>
          </div>
        </div>
      </Section>

      <Section top="none" bottom="tight">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <h2 className="font-display text-2xl leading-tight font-medium tracking-tight sm:text-3xl">
              Deckorators questions, answered straight.
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
