import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Eyebrow, Section, SectionHeading } from "@/components/sections/section";
import { CtaFinal } from "@/components/sections/cta-final";
import { Faq } from "@/components/sections/faq";
import { ReviewQuotes } from "@/components/sections/review-quotes";
import { FaqJsonLd } from "@/components/seo/faq-jsonld";
import { Button } from "@/components/ui/button";
import { ServiceJsonLd } from "@/components/seo/service-jsonld";
import { getAllServices, getService } from "@/lib/services";
import { getAllLocations } from "@/lib/locations";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};
  return {
    // metaTitle already includes the brand; `absolute` skips the layout's
    // "%s | Haka Decks" template so it isn't appended twice.
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${site.url}/services/${slug}`,
      images: [service.image],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const [others, locations] = await Promise.all([
    getAllServices().then((all) => all.filter((s) => s.slug !== slug)),
    getAllLocations(),
  ]);

  return (
    <>
      <ServiceJsonLd
        name={service.title}
        description={service.metaDescription}
        slug={slug}
        category={service.category}
        cities={locations.map((l) => l.name)}
      />
      {service.faqs.length > 0 ? <FaqJsonLd faqs={service.faqs} /> : null}

      <Section top="loose" bottom="tight">
        <Link
          href="/services"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All services
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>{service.category}</Eyebrow>
            <h1 className="font-display mt-4 text-4xl leading-[1.03] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {service.title}
            </h1>
            <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
              {service.summary}
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

          {service.bullets.length > 0 ? (
            <ul className="border-border/40 bg-card/40 space-y-3 rounded-2xl border p-6">
              {service.bullets.map((b) => (
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
            src={service.image}
            alt={service.name}
            fill
            priority
            sizes="1100px"
            className="object-cover"
          />
        </div>
      </div>

      <Section top="tight" bottom="tight">
        <article className="prose prose-haka mx-auto max-w-3xl">
          <MDXRemote source={service.body} />
        </article>
      </Section>

      {service.faqs.length > 0 ? (
        <Faq
          faqs={service.faqs}
          heading={`${service.name}: what homeowners ask us.`}
        />
      ) : null}

      {locations.length > 0 ? (
        <Section top="none" bottom="tight">
          <Eyebrow>Where we build</Eyebrow>
          <SectionHeading className="mt-4 text-3xl sm:text-4xl">
            {service.name} across the south metro.
          </SectionHeading>
          <ul className="mt-8 flex flex-wrap gap-3">
            {locations.map((l) => (
              <li key={l.slug}>
                <Link
                  href={`/locations/${l.slug}`}
                  className="border-border/40 hover:border-foreground/30 hover:bg-card/40 inline-flex items-center rounded-full border px-4 py-2 text-sm transition-colors"
                >
                  {l.name}, CO
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section top="none">
        <Eyebrow>More services</Eyebrow>
        <SectionHeading className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
          Explore what else we build.
        </SectionHeading>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="border-border/40 hover:border-foreground/30 hover:bg-card/40 group flex h-full flex-col rounded-2xl border p-6 transition-colors"
              >
                <span className="text-muted-foreground text-xs tracking-widest uppercase">
                  {s.category}
                </span>
                <span className="font-display mt-2 text-xl font-medium tracking-tight">
                  {s.name}
                </span>
                <span className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {s.summary}
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

      <ReviewQuotes seed={slug} />

      <CtaFinal />
    </>
  );
}
