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

const title = "Small Deck Builder in Denver, CO — 200 Sq Ft & Under | Haka Decks";
const description =
  "Small decks built like big ones — ground-level platforms, landings, and sub-200 sq ft builds across the Denver metro. Real pricing, two-week timelines, permit-exempt options.";

// Rendered below AND fed to FaqJsonLd — schema must match visible copy.
const FAQS: Faq[] = [
  {
    q: "How much does a small deck cost in Denver?",
    a: "The same honest math as any deck we build: capped composite runs $40–$70 per square foot installed, so a 120–200 square foot deck typically lands between $7,000 and $16,000 depending on height, railing, and stairs. Ground-level floating decks trend toward the bottom of that range because they often skip railing entirely — that's $30–90 per linear foot you never spend. Our calculator gives you a planning range in thirty seconds.",
  },
  {
    q: "Does a small deck need a permit?",
    a: "Often not — and that's one of the small deck's quiet advantages. Most Front Range jurisdictions exempt a deck that passes all three tests at once: under 200 square feet, under 30 inches above grade at every point, and freestanding rather than attached to the house. Miss any one and it's a normal permit. We confirm the rules for your specific city either way, because a few metro towns regulate lower structures too.",
  },
  {
    q: "How long does a small deck take to build?",
    a: "Most small builds are one to two weeks on site, and permit-exempt projects can start without the 1–3 week review window a permitted build waits through. That's why fall and winter are realistic build seasons for small projects in Colorado — the timeline fits between weather windows, and our crews have more room in the calendar than they do in June.",
  },
  {
    q: "Is a small project worth a custom deck builder's time?",
    a: "It's worth ours. Small decks, landings, balcony re-decks, and platform rebuilds are exactly what we schedule through fall and winter, and they get the same crew, the same engineered footings below frost line, and the same 2-year written workmanship warranty as a $60,000 build. The structure math doesn't shrink with the square footage — Colorado frost heave doesn't care how big the deck is.",
  },
];

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/small-deck-builder-denver" },
  openGraph: { title, description, url: `${site.url}/small-deck-builder-denver` },
};

export default function SmallDeckPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Small Deck Builder", path: "/small-deck-builder-denver" }]}
      />
      <FaqJsonLd faqs={FAQS} />

      <Section top="loose" bottom="tight">
        <Eyebrow>Small decks &amp; platforms</Eyebrow>
        <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.03] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Small decks, built like big ones.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
          Ground-level platforms, landings and steps, balcony re-decks, and sub-200-square-foot
          builds — the projects most &ldquo;custom&rdquo; builders won&apos;t return calls for.
          We schedule them all fall and winter, on the same engineered footings and the same
          written warranty as our biggest work.
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
            src="/images/projects/ranch-drone/08.jpeg"
            alt="Ground-level composite deck built by Haka Decks in the Denver metro"
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
            <Eyebrow>The permit math</Eyebrow>
            <SectionHeading className="mt-4 text-3xl sm:text-4xl">
              Under 200 square feet, the paperwork can disappear.
            </SectionHeading>
          </div>
          <div className="text-muted-foreground space-y-4 text-base leading-relaxed">
            <p>
              Most Front Range codes exempt a deck from permitting when it clears three tests at
              once: <span className="text-foreground font-medium">under 200 square feet</span>,{" "}
              <span className="text-foreground font-medium">under 30 inches above grade</span>,
              and <span className="text-foreground font-medium">freestanding</span> — not bolted
              to the house. A 14×14 platform floating in the yard can skip the permit queue and
              the guardrail requirement entirely, which is real money: railing runs $30–90 per
              linear foot that a ground-hugging deck never spends.
            </p>
            <p>
              What doesn&apos;t disappear is the structure. Colorado frost depth runs 30–36
              inches, and a small deck set on blocks-on-dirt turns into a gentle wave within a few
              winters. We build small decks on proper frost-depth footings — the full argument is
              in our{" "}
              <Link
                href="/blog/floating-deck-guide-colorado"
                className="text-foreground font-medium underline underline-offset-3 hover:no-underline"
              >
                floating deck guide
              </Link>
              , and the{" "}
              <Link
                href="/deck-permits-south-denver-metro"
                className="text-foreground font-medium underline underline-offset-3 hover:no-underline"
              >
                permit guide
              </Link>{" "}
              covers who requires what, city by city.
            </p>
          </div>
        </div>
      </Section>

      <Section top="tight" bottom="tight">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <Eyebrow>What small projects look like</Eyebrow>
            <SectionHeading className="mt-4 text-3xl sm:text-4xl">
              The fall &amp; winter project list.
            </SectionHeading>
          </div>
          <div className="text-muted-foreground space-y-4 text-base leading-relaxed">
            <p>
              <span className="text-foreground font-medium">Ground-level platforms</span> — a
              120–300 square foot outdoor room at yard height, typically $8,000–$16,000 built
              properly, footings included.{" "}
              <span className="text-foreground font-medium">Landings and steps</span> — the
              back-door rebuild that fixes the wobbly stair nobody trusts.{" "}
              <span className="text-foreground font-medium">Balcony and small deck re-decks</span>{" "}
              — new composite surface over sound framing at $20–35 per square foot.{" "}
              <span className="text-foreground font-medium">Spa and hot-tub platforms</span> —
              engineered for the real load, which is the part that matters.
            </p>
            <p>
              Small builds fit fall weather windows: one to two weeks on site, and permit-exempt
              projects skip the review queue entirely. Our guide to the{" "}
              <Link
                href="/blog/best-time-to-build-deck-colorado"
                className="text-foreground font-medium underline underline-offset-3 hover:no-underline"
              >
                best time to build in Colorado
              </Link>{" "}
              explains why off-season contracts win on both price and schedule — and a{" "}
              <Link
                href="/blog/hot-tub-deck-guide"
                className="text-foreground font-medium underline underline-offset-3 hover:no-underline"
              >
                hot tub platform
              </Link>{" "}
              built now is ready for the first snow soak.
            </p>
            <p>
              Want the planning numbers first? The{" "}
              <Link
                href="/deck-cost-calculator"
                className="text-foreground font-medium underline underline-offset-3 hover:no-underline"
              >
                cost calculator
              </Link>{" "}
              gives you a range in thirty seconds, and our{" "}
              <Link
                href="/services/composite-decks"
                className="text-foreground font-medium underline underline-offset-3 hover:no-underline"
              >
                composite deck page
              </Link>{" "}
              covers how we build every surface we install.
            </p>
          </div>
        </div>
      </Section>

      <Section top="none" bottom="tight">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <h2 className="font-display text-2xl leading-tight font-medium tracking-tight sm:text-3xl">
              Small-deck questions, answered straight.
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
