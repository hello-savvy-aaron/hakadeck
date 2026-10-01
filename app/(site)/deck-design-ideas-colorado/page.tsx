import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaFinal } from "@/components/sections/cta-final";
import { ReviewQuotes } from "@/components/sections/review-quotes";
import { GuideArticleJsonLd } from "@/components/seo/guide-article-jsonld";
import { DeckStyleChooserFigure } from "@/components/guides/figure-process";
import { NewsletterSignup } from "@/components/guides/newsletter-signup";
import { getAllProjects, projectVideo } from "@/lib/portfolio";
import { guideBySlug, GUIDES_HUB } from "@/lib/guides";
import { site } from "@/lib/site";
import { ArrowLeft, Play } from "lucide-react";
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

// The flyover tile links to the clip's watch page rather than embedding the
// file: Google indexes a video only where it is the page's main content, and
// the embed that used to sit here was reported as "Video isn't on a watch page".
const FLYOVER_SLUG = "ranch-deck";

export default async function GalleryPage() {
  const projects = await getAllProjects();
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const tiles = TILES.map((t) => ({ ...t, project: bySlug.get(t.slug) })).filter((t) => t.project);
  const flyoverProject = bySlug.get(FLYOVER_SLUG);
  const flyover = flyoverProject ? projectVideo(flyoverProject) : null;

  return (
    <>
      <GuideArticleJsonLd
        title={title}
        description={description}
        path={guide.href}
        datePublished="2026-07-17"
        dateModified="2026-10-01"
      />

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

        <div className="mt-6">
          <DeckStyleChooserFigure />
        </div>

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
                <span className="text-foreground group-hover:text-haka-pine font-semibold">
                  {caption}
                </span>{" "}
                <span className="text-muted-foreground">{blurb}</span>
              </p>
            </Link>
          ))}
        </div>

        {flyover ? (
          <Link href={flyover.path} className="group mt-6 flex flex-col gap-2">
            <div className="border-border relative aspect-[4/3] w-full overflow-hidden rounded-xl border">
              <Image
                src={flyover.poster}
                alt={flyover.title}
                fill
                sizes="(min-width: 700px) 640px, 92vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                  <Play className="h-3.5 w-3.5 fill-current" aria-hidden />
                  Watch · {flyover.durationLabel}
                </span>
              </span>
            </div>
            <p className="text-[13.5px]">
              <span className="text-foreground group-hover:text-haka-pine font-semibold">
                Flyover.
              </span>{" "}
              <span className="text-muted-foreground">
                The build above from the air — how a Colorado custom deck sits in its yard. Opens
                the {flyover.durationSeconds}-second drone pass.
              </span>
            </p>
          </Link>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-2.5">
          <Button asChild className="h-11">
            <Link href="/deck-cost-guide-denver">What one like this costs →</Link>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <Link href="/composite-vs-hardwood-decking-colorado">Materials guide →</Link>
          </Button>
        </div>

        <div className="text-muted-foreground [&_a]:text-foreground [&_a]:decoration-border [&_h2]:font-display [&_h2]:text-foreground mt-12 space-y-4 text-[15px] leading-relaxed [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-medium [&_h2]:tracking-tight">
          <h2>What makes a Colorado custom deck different</h2>
          <p>
            Every photo above started with the same constraint: a Colorado custom deck has to be
            designed for a mile of altitude before it&apos;s designed for anything else. That means
            framing sized for real snow loads, footings below the frost line, surfaces that tolerate
            300-plus days of UV, and shade planned like a room — not added later as an umbrella. Get
            those right and the fun decisions (levels, curves, covers, kitchens) have something
            solid to stand on.
          </p>

          <h2>Start with how you&apos;ll use the outdoor space</h2>
          <p>
            Before boards or railing, decide what the deck is for and give each job its own zone. A
            dining table for six needs a clear area of roughly 10 by 12 feet once the chairs pull
            back; a lounge group of a sofa and two chairs wants about the same. Two zones plus a
            walkway between them is why so many decks land at 300 to 400 square feet — and why a
            deck sized off a sketch of the house, rather than off the furniture, so often feels
            cramped.
          </p>
          <p>
            Some uses are structural decisions, not furniture ones. A{" "}
            <Link href="/blog/hot-tub-deck-guide">hot tub</Link> puts 100-plus pounds per square
            foot on framing normally designed for 40, so its spot has to be chosen before the
            footings go in. An <Link href="/services/outdoor-kitchens">outdoor kitchen</Link> brings
            stone counters, gas, and power, and gets framed for those loads from the start. Decide
            them up front, even if you build them later.
          </p>

          <h2>Let the slope pick the layout</h2>
          <p>
            The south metro rolls, and the best deck designs use that instead of fighting it. A
            walk-out lot wants a two-tier layout — dining on the door level, a shaded lounge below —
            while a flat ranch lot often wants the opposite: one wide, ground-hugging platform that
            keeps the view open. If your yard has grade, look hard at the two-tier builds above
            before you settle for one big rectangle on stilts.
          </p>
          <p>
            Multi-level decks also break up the climb. Instead of one long flight from a
            second-story door to the lawn, a mid-level landing becomes a place to sit, and each
            level gets its own purpose. Curves are the other layout move worth knowing about: a
            radius edge traced around a mature tree or a garden bed softens a big deck more than any
            material choice, though curved framing and heat-formed border boards take more layout
            time and cost more than straight runs.
          </p>

          <h2>Design the shade with the deck</h2>
          <p>
            At this altitude a west-facing deck without shade is unusable from four to seven in
            July. A <Link href="/services/pergolas-patio-covers">pergola or solid-roof cover</Link>{" "}
            over part of the deck — not all of it — gives you a cool room and a sunny one, and a
            tongue-and-groove ceiling with lighting turns the covered half into a genuine outdoor
            living room, October snow showers included.
          </p>
          <p>
            Hail changes the roof conversation here. Open pergolas only filter the sun; a solid roof
            or a <Link href="/blog/polycarbonate-roof-covers-guide">polycarbonate cover</Link> keeps
            furniture and grills out of the May-to-September storms, and a{" "}
            <Link href="/blog/screened-porch-three-season-room-colorado">
              screened porch or three-season room
            </Link>{" "}
            takes the same structure one step further for bug-free evenings well into the fall.
          </p>

          <h2>Pick materials and color in the sun, not on a screen</h2>
          <p>
            Most of our builds are capped composite — Deckorators is our go-to — because it handles
            Colorado&apos;s freeze-thaw and UV without a restaining schedule, but the brand and line
            matter less than people think. Our{" "}
            <Link href="/composite-vs-hardwood-decking-colorado">materials guide</Link> covers
            composite against hardwood, and our{" "}
            <Link href="/blog/trex-vs-timbertech-vs-fiberon">Trex vs. TimberTech vs. Fiberon</Link>{" "}
            comparison sorts out the brands. The decision that changes how a deck feels is color: a
            light gray or tan board runs 10 to 30 degrees cooler underfoot than a dark one in the
            same line. Set physical samples on the actual deck site and look at them morning and
            evening before you commit.
          </p>
          <p>
            Mixing materials is where a design starts to look custom: a contrasting picture-frame
            border, a cedar pergola over composite boards, black aluminum railing against a warm
            wood tone, or a stone landing at the bottom of the stairs. Two or three materials that
            repeat the house&apos;s trim and stone usually beat five that compete.
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
            along a rail line, a curve traced around a mature tree — these are the moves that make a
            deck look designed rather than assembled. Most cost hundreds, not thousands, when
            they&apos;re planned into the build; our{" "}
            <Link href="/blog/deck-stairs-railings-cost-guide">add-on cost guide</Link> puts real
            numbers on each.
          </p>
          <p>
            Lighting deserves its own mention, because it decides whether the deck gets used after
            dark. Low-voltage post caps, recessed stair-riser lights, and a soft strip under the
            rail or bench cost far less to wire while the framing is open than to retrofit later —
            run the wiring during the build even if some fixtures wait a year.
          </p>

          <h2>Design for January, too</h2>
          <p>
            Front Range decks see snow from October into May, and the best designs plan for it.
            Framing is sized for the snow load, not just for a summer party; stairs face away from
            the roof&apos;s drip line so they don&apos;t ice over; and there&apos;s an obvious edge
            to push snow off, using a plastic shovel along the length of the boards. Our guide to{" "}
            <Link href="/blog/how-much-snow-can-my-deck-hold">how much snow a deck can hold</Link>{" "}
            explains the numbers, and a covered section means less of the deck to clear at all.
          </p>

          <h2>A five-step design checklist</h2>
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              List what the deck is for — dining, lounging, grilling, a hot tub — and size a zone
              for each.
            </li>
            <li>Note where the sun sits at 5 p.m. in July; that&apos;s where the shade goes.</li>
            <li>Walk the slope and decide between one level and two before anything else.</li>
            <li>Choose the railing for the view you want to keep, not from a catalog.</li>
            <li>
              Decide now on covers, kitchens, lighting, and hot tubs — even ones you&apos;ll add
              later — so the framing is ready for them.
            </li>
          </ol>

          <h2>From design to finished product</h2>
          <p>
            Designing and building with the same team means the drawing you approve is the deck that
            gets built. We measure the site, draw the layout, file the permit and HOA paperwork,
            frame it to the plan, and Pete walks every project personally — the attention to detail
            that separates a designed deck from an assembled one happens on site, not just on paper.
            Everything we build is guaranteed. Our <Link href="/process">process page</Link> lays
            out each step, and the <Link href="/portfolio">portfolio</Link> shows the finished
            builds behind every photo here.
          </p>
          <p>
            Want any of these ideas priced for your yard?{" "}
            <Link href="/contact">Tell us what you&apos;re picturing</Link> and we&apos;ll walk the
            site with samples.
          </p>
        </div>

        <NewsletterSignup />
      </div>

      <ReviewQuotes seed="deck-design-ideas-colorado" />
      <CtaFinal />
    </>
  );
}
