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

const title = "Colorado Custom Deck Design Ideas — Real Builds | Haka Decks";
const description =
  "Colorado custom deck design ideas from real Haka builds in the south Denver metro — composite and cable railing, covered decks, walk-outs, pergolas, and more. Steal freely.";

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
          Colorado Custom Deck Design Ideas — Real Builds.
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

        <div className="text-muted-foreground mt-12 space-y-4 text-[15px] leading-relaxed [&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:decoration-border [&_a]:underline-offset-4 [&_h2]:font-display [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-medium [&_h2]:tracking-tight [&_h2]:text-foreground">
          <h2>What makes a Colorado custom deck different</h2>
          <p>
            Every photo above started with the same constraint: a Colorado custom deck has to be
            designed for a mile of altitude before it&apos;s designed for anything else. That means
            framing sized for real snow loads, footings below the frost line, surfaces that
            tolerate 300-plus days of UV, and shade planned like a room — not added later as an
            umbrella. Get those right and the fun decisions (levels, curves, covers, kitchens) have
            something solid to stand on.
          </p>

          <h2>Let the slope pick the layout</h2>
          <p>
            The south metro rolls, and the best deck designs use that instead of fighting it. A
            walk-out lot wants a two-tier layout — dining on the door level, a shaded lounge below —
            while a flat ranch lot often wants the opposite: one wide, ground-hugging platform that
            keeps the view open. If your yard has grade, look hard at the two-tier builds above
            before you settle for one big rectangle on stilts.
          </p>

          <h2>Design the shade with the deck</h2>
          <p>
            At this altitude a west-facing deck without shade is unusable from four to seven in
            July. A <Link href="/services/pergolas-patio-covers">pergola or solid-roof cover</Link>{" "}
            over part of the deck — not all of it — gives you a cool room and a sunny one, and a
            tongue-and-groove ceiling with lighting turns the covered half into a genuine outdoor
            living room, October snow showers included.
          </p>

          <h2>Railing decides what you see</h2>
          <p>
            Railing is a third of what your eye reads from inside the house.{" "}
            <Link href="/services/railings">Cable and slim aluminum systems</Link> hold a foothills
            view; composite and wood rails frame a yard more privately. Pick the railing with the
            view in mind, not from a catalog page.
          </p>

          <h2>The details that read as custom</h2>
          <p>
            Picture-frame borders in a contrasting board, stair-riser lighting, built-in benches
            along a rail line, a curve traced around a mature tree — these are the moves that make
            a deck look designed rather than assembled. Most cost hundreds, not thousands, when
            they&apos;re planned into the build; our{" "}
            <Link href="/blog/deck-stairs-railings-cost-guide">add-on cost guide</Link> puts real
            numbers on each.
          </p>
          <p>
            Want any of these ideas priced for your yard? <Link href="/contact">Tell us what
            you&apos;re picturing</Link> and we&apos;ll walk the site with samples.
          </p>
        </div>

        <NewsletterSignup />
      </div>

      <CtaFinal />
    </>
  );
}
