import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow, Section, SectionHeading } from "@/components/sections/section";
import { CtaFinal } from "@/components/sections/cta-final";
import { BrandLogoMarquee } from "@/components/sections/brand-logo-marquee";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { getAllServices } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Deck Builder Services",
  description:
    "Composite and hardwood decks, pergolas and patio covers, outdoor kitchens, railings, and deck repair — built by a specialist deck builder across Centennial and the south Denver metro.",
};

export default async function ServicesPage() {
  const services = await getAllServices();

  return (
    <>
      <Section top="loose" bottom="tight">
        <Eyebrow>Services</Eyebrow>
        <h1 className="font-display mt-4 max-w-4xl text-balance text-5xl leading-[1.02] font-medium tracking-tight sm:text-6xl lg:text-8xl">
          Outdoor living, engineered for Colorado.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
          We don&apos;t carry a hundred services. We build a handful of things,
          and we build them better than the deck-and-handyman shops down the
          street — for homeowners across {site.address.city} and the{" "}
          {site.address.region}.
        </p>
      </Section>

      <Section top="none">
        <ul className="grid gap-y-24">
          {services.map((s, i) => (
            <li key={s.slug}>
              <Reveal>
                <article className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
                  <div className={i % 2 ? "lg:order-2" : ""}>
                    <Eyebrow>{s.category}</Eyebrow>
                    <SectionHeading className="mt-4">
                      <Link
                        href={`/services/${s.slug}`}
                        className="underline-offset-4 hover:underline"
                      >
                        {s.name}
                      </Link>
                    </SectionHeading>
                    <p className="text-muted-foreground mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
                      {s.summary}
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
                    <div className="mt-10 flex flex-wrap gap-3">
                      <Button asChild size="lg" className="h-12 px-6 text-base">
                        <Link href={`/services/${s.slug}`}>
                          Learn more
                          <ArrowRight className="ml-1.5 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild size="lg" variant="ghost" className="h-12 px-6 text-base">
                        <Link href={site.cta.href}>{site.cta.label}</Link>
                      </Button>
                    </div>
                  </div>
                  <Link
                    href={`/services/${s.slug}`}
                    className={`border-border/40 relative aspect-[4/5] overflow-hidden rounded-2xl border ${i % 2 ? "lg:order-1" : ""}`}
                  >
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      sizes="(min-width: 1024px) 45vw, 90vw"
                      className="object-cover"
                    />
                  </Link>
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
