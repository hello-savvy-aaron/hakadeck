import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow, Section, SectionHeading } from "@/components/sections/section";
import { CtaFinal } from "@/components/sections/cta-final";
import { BrandLogoMarquee } from "@/components/sections/brand-logo-marquee";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Composite and hardwood decks, pergolas, covered structures, outdoor kitchens, railings, and repair work across the south Denver metro.",
};

const SERVICES = [
  {
    title: "Composite Decks",
    body:
      "Our default for Colorado. Deckorators composite boards stay solid through 30°-temperature swings, summer hail, and altitude UV — backed by 25-year manufacturer warranties.",
    bullets: ["Single-level, multi-tier, wraparound", "Full railing system + lighting", "Permit + HOA paperwork handled"],
    image: "/assets/projects/ranch-drone/02.jpeg",
  },
  {
    title: "Hardwood & Cedar Decks",
    body:
      "When the look matters more than the maintenance schedule. Clear-grade Western Red Cedar, Garapa, and thermally-modified ash — beautiful, but you'll want to plan on annual care.",
    bullets: ["Pre-finished or site-finished", "Hidden-fastener systems", "Annual maintenance plans available"],
    image: "/assets/projects/double-decker/05.jpeg",
  },
  {
    title: "Pergolas & Covered Decks",
    body:
      "Year-round shade structures, from open-rafter pergolas to fully roofed pavilions with integrated electrical, fans, and heaters. We design and engineer the structure end-to-end.",
    bullets: ["Aluminum and timber framing", "Adjustable louvered roofs", "Integrated lighting + ceiling fans"],
    image: "/assets/projects/double-decker/14.jpeg",
  },
  {
    title: "Outdoor Kitchens & Bars",
    body:
      "Built-in grills, ventilated counters, sinks, and refrigeration — engineered into the deck structure rather than bolted on. Stone, tile, or composite countertops.",
    bullets: ["Gas + 220V electrical runs", "Drainage and freeze-tolerant plumbing", "Bar-height seating built in"],
    image: "/assets/projects/double-decker/11.jpeg",
  },
  {
    title: "Railing Systems",
    body:
      "Cable, aluminum, glass panel, or composite. The detail nobody notices when it's done well — and everyone notices when it isn't. Code-compliant on every Colorado deck.",
    bullets: ["Cable, aluminum, glass, composite", "Stair railings + grab rails", "Integrated post lighting"],
    image: "/assets/projects/ranch-drone/06.jpeg",
  },
  {
    title: "Deck Repair & Restoration",
    body:
      "If the bones are good, we'll save the structure and replace the surface. If they're not, we'll tell you straight. We won't lipstick a deck that needs to come down.",
    bullets: ["Structural inspection + report", "Board + railing replacement", "Code-compliant rebuilds"],
    image: "/assets/projects/double-decker/17.jpeg",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Section top="loose" bottom="tight">
        <Eyebrow>Services</Eyebrow>
        <h1 className="font-display mt-4 max-w-4xl text-balance text-5xl leading-[1.02] font-medium tracking-tight sm:text-6xl lg:text-8xl">
          Outdoor living, engineered for Colorado.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
          We don&apos;t carry a hundred services. We build six things, and we
          build them better than the deck-and-handyman shops down the street.
        </p>
      </Section>

      <Section top="none">
        <ul className="grid gap-y-24">
          {SERVICES.map((s, i) => (
            <li key={s.title}>
              <Reveal>
                <article className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
                  <div className={i % 2 ? "lg:order-2" : ""}>
                    <Eyebrow>{`0${i + 1} / Service`}</Eyebrow>
                    <SectionHeading className="mt-4">{s.title}</SectionHeading>
                    <p className="text-muted-foreground mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
                      {s.body}
                    </p>
                    <ul className="mt-8 space-y-3">
                      {s.bullets.map((b) => (
                        <li
                          key={b}
                          className="text-foreground/85 flex items-start gap-3 text-sm sm:text-base"
                        >
                          <span aria-hidden className="bg-haka-cream mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-10">
                      <Button asChild size="lg" className="h-12 px-6 text-base">
                        <Link href={site.cta.href}>
                          {site.cta.label}
                          <ArrowRight className="ml-1.5 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <div
                    className={`border-border/40 relative aspect-[4/5] overflow-hidden rounded-2xl border ${i % 2 ? "lg:order-1" : ""}`}
                  >
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 45vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <BrandLogoMarquee />
      <CtaFinal />
    </>
  );
}
