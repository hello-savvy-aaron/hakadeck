import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaFinal } from "@/components/sections/cta-final";
import { NewsletterSignup } from "@/components/guides/newsletter-signup";
import { getAllProjects } from "@/lib/portfolio";
import { guideBySlug, GUIDES_HUB } from "@/lib/guides";
import { site } from "@/lib/site";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const guide = guideBySlug("deck-design-ideas-colorado")!;

const title = "Deck Design Ideas — Real Colorado Builds | Haka Decks";
const description =
  "A gallery of finished Haka deck projects across the south Denver metro — composite and cable railing, covered decks, walk-outs, pergolas, and more. Steal freely.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: guide.href },
  openGraph: { title, description, url: `${site.url}${guide.href}` },
};

// Curated tiles → real portfolio projects. Captions describe the actual build,
// so the gallery doubles as internal links into the portfolio.
const TILES: { slug: string; caption: string; blurb: string }[] = [
  {
    slug: "ranch-deck",
    caption: "Ground-level composite.",
    blurb: "Opens straight off the great room — keeps the Front Range view wide open.",
  },
  {
    slug: "walkout-covered-deck",
    caption: "Covered deck.",
    blurb: "Shade in July, usable in an October snow shower.",
  },
  {
    slug: "two-tier-balcony-deck",
    caption: "Elevated & walk-out.",
    blurb: "Engineered posts and beams for 6 ft+ heights — common south of Denver.",
  },
  {
    slug: "pergola-patio-screen",
    caption: "Pergola & shade.",
    blurb: "Filtered shade over the deck without closing off the sky.",
  },
  {
    slug: "double-decker",
    caption: "Two-tier composite.",
    blurb: "Two levels of living space stacked on a sloped lot.",
  },
  {
    slug: "patio-cover-tongue-groove",
    caption: "Tongue-and-groove cover.",
    blurb: "A finished ceiling overhead turns a deck into a true outdoor room.",
  },
];

export default async function GalleryPage() {
  const projects = await getAllProjects();
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const tiles = TILES.map((t) => ({ ...t, project: bySlug.get(t.slug) })).filter((t) => t.project);

  return (
    <>
      <div className="mx-auto max-w-[42.5rem] px-5 pt-28 pb-16 sm:px-8 sm:pt-32">
        <Link
          href={GUIDES_HUB}
          className="text-primary hover:text-haka-pine inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All guides &amp; tools
        </Link>

        <h1 className="font-display text-foreground mt-3.5 text-[2rem] leading-[1.15] font-medium tracking-tight text-balance">
          Deck Design Ideas — Real Colorado Builds.
        </h1>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          Every photo is a Haka project in the south Denver metro. Steal freely.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5">
          {tiles.map(({ slug, caption, blurb, project }) => (
            <Link key={slug} href={`/portfolio/${slug}`} className="group flex flex-col gap-2">
              <div className="border-border relative aspect-[4/3] w-full overflow-hidden rounded-xl border">
                <Image
                  src={project!.cover}
                  alt={project!.title}
                  fill
                  sizes="(min-width: 700px) 640px, 92vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <p className="text-[13.5px]">
                <span className="text-foreground font-semibold group-hover:text-haka-pine">
                  {caption}
                </span>{" "}
                <span className="text-muted-foreground">{blurb}</span>
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2.5">
          <Button asChild className="h-11">
            <Link href="/deck-cost-guide-denver">What one like this costs →</Link>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <Link href="/composite-vs-hardwood-decking-colorado">Materials guide →</Link>
          </Button>
        </div>

        <NewsletterSignup />
      </div>

      <CtaFinal />
    </>
  );
}
