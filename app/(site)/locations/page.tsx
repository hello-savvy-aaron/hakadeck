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
    "Haka Decks builds custom composite decks, pergolas, and outdoor living spaces across the Front Range — Fort Collins to Colorado Springs, the Denver metro, foothills, and mountain towns.",
  alternates: { canonical: "/locations" },
};

export default async function LocationsPage() {
  const all = await getAllLocations();
  // County hub pages (slug convention: "*-county") lead the page — homeowners
  // shouldn't have to find their exact town in a 50-card grid to know we
  // serve them. City pages keep the image-card grid below.
  const counties = all.filter((l) => l.slug.endsWith("-county"));
  const locations = all.filter((l) => !l.slug.endsWith("-county"));
  const bySlugName = new Map(locations.map((l) => [l.name.toLowerCase(), l]));
  // City pages whose name isn't in the GBP region list (e.g. Roxborough Park).
  const listed = new Set(
    site.serviceAreaRegions.flatMap((r) => r.cities.map((c) => c.toLowerCase())),
  );
  const unlisted = locations.filter((l) => !listed.has(l.name.toLowerCase()));

  return (
    <>
      <Section top="loose" bottom="tight">
        <Eyebrow>Service Areas</Eyebrow>
        <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[1.02] font-medium tracking-tight text-balance sm:text-6xl lg:text-8xl">
          The Front Range is home turf.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
          Our shop is in the {site.address.district}, and we build {site.serviceArea}. Naming every
          town would take all day, so start with your county — if it&apos;s below, so are you. Every
          project gets the same crew, the same materials, and the same warranty, whichever line of
          the map you live on.
        </p>
      </Section>

      {counties.length > 0 ? (
        <Section top="none" bottom="tight">
          <Eyebrow>By county</Eyebrow>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {counties.map((county) => (
              <li key={county.slug}>
                <Link
                  href={`/locations/${county.slug}`}
                  className="border-border/40 hover:border-foreground/30 hover:bg-card/40 group flex h-full flex-col rounded-2xl border p-6 transition-colors"
                >
                  <span className="text-muted-foreground text-xs tracking-widest uppercase">
                    {county.name}
                  </span>
                  <span className="font-display mt-2 text-lg font-medium tracking-tight">
                    {county.title}
                  </span>
                  <span className="text-foreground/80 mt-4 inline-flex items-center text-sm font-medium">
                    See the county
                    <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* Every city and town in the GBP service area, grouped by region, with
          a link wherever a page exists. This replaced the image-card grid once
          the page count passed 100 — a card per city was a 100-image page. */}
      <Section top="none">
        <Eyebrow>By city</Eyebrow>
        <h2 className="font-display mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
          Everywhere we build
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
          The full list, so there&apos;s no guessing. Linked towns have their own page — permits,
          snow loads, local offices, what we build there. If your town is on the list, or even just
          near it, we&apos;ll come take a look.
        </p>
        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {site.serviceAreaRegions.map((group) => (
            <div key={group.region}>
              <h3 className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
                {group.region}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-x-1.5 gap-y-1 text-sm leading-relaxed">
                {group.cities.map((city, i) => {
                  const page = bySlugName.get(city.toLowerCase());
                  return (
                    <li key={city} className="text-foreground/80">
                      {i > 0 ? <span className="text-muted-foreground/60 mr-1.5">·</span> : null}
                      {page ? (
                        <Link
                          href={`/locations/${page.slug}`}
                          className="text-foreground decoration-border hover:decoration-foreground font-medium underline underline-offset-4"
                        >
                          {city}
                        </Link>
                      ) : (
                        city
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        {unlisted.length > 0 ? (
          <p className="text-muted-foreground mt-8 text-sm leading-relaxed">
            Also:{" "}
            {unlisted.map((l, i) => (
              <span key={l.slug}>
                {i > 0 ? " · " : null}
                <Link
                  href={`/locations/${l.slug}`}
                  className="text-foreground decoration-border hover:decoration-foreground font-medium underline underline-offset-4"
                >
                  {l.name}
                </Link>
              </span>
            ))}
          </p>
        ) : null}
      </Section>

      <CtaFinal />
    </>
  );
}
