import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check, MapPin, Phone } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Eyebrow, Section, SectionHeading } from "@/components/sections/section";
import { CtaFinal } from "@/components/sections/cta-final";
import { Faq } from "@/components/sections/faq";
import { FaqJsonLd } from "@/components/seo/faq-jsonld";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/portfolio/project-card";
import { LocationJsonLd } from "@/components/seo/location-jsonld";
import { getAllLocations, getLocation } from "@/lib/locations";
import { getProject } from "@/lib/portfolio";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const locations = await getAllLocations();
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = await getLocation(slug);
  if (!location) return {};
  return {
    // metaTitle already includes the brand; `absolute` skips the layout's
    // "%s | Haka Decks" template so it isn't appended twice.
    title: { absolute: location.metaTitle },
    description: location.metaDescription,
    alternates: { canonical: `/locations/${slug}` },
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      url: `${site.url}/locations/${slug}`,
      images: [location.image],
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = await getLocation(slug);
  if (!location) notFound();

  const [projects, others] = await Promise.all([
    Promise.all(location.projects.map((p) => getProject(p))),
    getAllLocations().then((all) => all.filter((l) => l.slug !== slug)),
  ]);
  const cityProjects = projects.filter((p) => p !== null);

  return (
    <>
      <LocationJsonLd
        name={location.title}
        city={location.name}
        description={location.metaDescription}
        slug={slug}
      />
      {location.faqs.length > 0 ? <FaqJsonLd faqs={location.faqs} /> : null}

      <Section top="loose" bottom="tight">
        <Link
          href="/locations"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All service areas
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>{location.name}, Colorado</Eyebrow>
            <h1 className="font-display mt-4 text-4xl leading-[1.03] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {location.title}
            </h1>
            <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
              {location.summary}
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="h-12 px-6 text-base">
                <Link href={site.cta.href}>
                  {site.cta.label}
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {location.bullets.length > 0 ? (
            <ul className="border-border/40 bg-card/40 space-y-3 rounded-2xl border p-6">
              {location.bullets.map((b) => (
                <li
                  key={b}
                  className="text-foreground/85 flex items-start gap-3 text-sm sm:text-base"
                >
                  <Check className="text-haka-cream mt-0.5 h-4 w-4 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Section>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="border-border/40 relative aspect-[16/9] overflow-hidden rounded-2xl border">
          <Image
            src={location.image}
            alt={`Deck built by ${site.name} near ${location.name}, CO`}
            fill
            priority
            sizes="1100px"
            className="object-cover"
          />
        </div>
      </div>

      <Section top="tight" bottom="tight">
        <article className="prose prose-haka mx-auto max-w-3xl">
          <MDXRemote source={location.body} />
        </article>
      </Section>

      {location.faqs.length > 0 ? (
        <Faq faqs={location.faqs} heading={`Deck questions ${location.name} homeowners ask.`} />
      ) : null}

      {cityProjects.length > 0 ? (
        <Section top="none" bottom="tight">
          <Eyebrow>Recent work</Eyebrow>
          <SectionHeading className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
            Built in and around {location.name}.
          </SectionHeading>
          <ul className="mt-10 grid gap-8 lg:grid-cols-2">
            {cityProjects.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} featured />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section top="none" bottom="tight">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <Eyebrow>Where we are</Eyebrow>
            <SectionHeading className="mt-4 text-3xl sm:text-4xl">
              A short drive from {location.name}.
            </SectionHeading>
            <div className="text-muted-foreground mt-6 space-y-3 text-sm leading-relaxed">
              <p className="flex items-start gap-2">
                <MapPin className="text-foreground/60 mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {site.name} · {site.address.street}, {site.address.city}, {site.address.state}{" "}
                  {site.address.zip}
                </span>
              </p>
              <p className="flex items-start gap-2">
                <Phone className="text-foreground/60 mt-0.5 h-4 w-4 shrink-0" />
                <a href={site.phoneHref} className="hover:text-foreground">
                  {site.phone}
                </a>
              </p>
            </div>
          </div>
          <div className="border-border/40 overflow-hidden rounded-2xl border">
            <iframe
              title={`Map of ${location.name}, Colorado`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(location.mapQuery)}&output=embed`}
              className="h-72 w-full sm:h-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Section>

      {others.length > 0 ? (
        <Section top="none">
          <Eyebrow>More service areas</Eyebrow>
          <SectionHeading className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
            Everywhere else we build.
          </SectionHeading>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((l) => (
              <li key={l.slug}>
                <Link
                  href={`/locations/${l.slug}`}
                  className="border-border/40 hover:border-foreground/30 hover:bg-card/40 group flex h-full flex-col rounded-2xl border p-6 transition-colors"
                >
                  <span className="text-muted-foreground text-xs tracking-widest uppercase">
                    {l.name}, CO
                  </span>
                  <span className="font-display mt-2 text-xl font-medium tracking-tight">
                    {l.title}
                  </span>
                  <span className="text-foreground/80 mt-4 inline-flex items-center text-sm font-medium">
                    Learn more
                    <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <CtaFinal />
    </>
  );
}
