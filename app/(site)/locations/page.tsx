import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Eyebrow, Section } from "@/components/sections/section";
import { CtaFinal } from "@/components/sections/cta-final";
import { getAllLocations } from "@/lib/locations";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Haka Decks builds custom composite decks, pergolas, and outdoor living spaces across the south Denver metro — Centennial, Greenwood Village, Lone Tree, and beyond.",
  alternates: { canonical: "/locations" },
};

export default async function LocationsPage() {
  const locations = await getAllLocations();

  return (
    <>
      <Section top="loose" bottom="tight">
        <Eyebrow>Service Areas</Eyebrow>
        <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[1.02] font-medium tracking-tight text-balance sm:text-6xl lg:text-8xl">
          South Denver is home turf.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
          Our shop is in {site.address.city}, and everywhere we build is a short drive from it.
          Every city below gets the same crew, the same materials, and the same warranty — plus a
          builder who knows its neighborhoods, HOAs, and permit offices firsthand.
        </p>
      </Section>

      <Section top="none">
        <ul className="grid gap-8 lg:grid-cols-2">
          {locations.map((location) => (
            <li key={location.slug}>
              <Link
                href={`/locations/${location.slug}`}
                className="border-border/40 hover:border-foreground/30 group block overflow-hidden rounded-2xl border transition-colors"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={location.image}
                    alt={`Deck by ${site.name} near ${location.name}, CO`}
                    fill
                    sizes="(min-width: 1024px) 550px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <span className="text-muted-foreground text-xs tracking-widest uppercase">
                    {location.name}, CO
                  </span>
                  <h2 className="font-display mt-2 text-2xl font-medium tracking-tight">
                    {location.title}
                  </h2>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {location.summary}
                  </p>
                  <span className="text-foreground/80 mt-4 inline-flex items-center text-sm font-medium">
                    See our work in {location.name}
                    <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaFinal />
    </>
  );
}
