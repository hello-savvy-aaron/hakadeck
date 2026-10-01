import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Icon } from "@/components/icons/icon";
import { Button } from "@/components/ui/button";
import { CtaFinal } from "@/components/sections/cta-final";
import { Eyebrow } from "@/components/sections/section";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-jsonld";
import { VideoJsonLd } from "@/components/seo/video-jsonld";
import { getAllProjects, getProject, projectVideo } from "@/lib/portfolio";
import { site } from "@/lib/site";

// The watch page for a project's drone flyover. Google indexes a video only
// where it is the main content of its page — Search Console reported both
// clips as "Video isn't on a watch page" while they lived inside the project
// pages and the design-ideas gallery — so each clip leads here: above the
// fold, full frame, with controls, plus VideoObject JSON-LD and a video
// sitemap entry (app/sitemap.ts). Everything else on the site links in.
//
// Below the clip the page carries its own copy — what the flyover shows, the
// build behind it, and the other flyovers — so it stands as a page in its own
// right rather than a thin wrapper around a file (Semrush flagged both watch
// pages for word count), and so the second clip has more than one inbound
// link.

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.filter((p) => projectVideo(p)).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  const video = project && projectVideo(project);
  if (!video) return {};
  return {
    title: video.title,
    description: video.description,
    alternates: { canonical: video.path },
    openGraph: {
      type: "video.other",
      title: video.title,
      description: video.description,
      url: `${site.url}${video.path}`,
      images: [video.poster],
      videos: [{ url: `${site.url}${video.src}`, type: "video/mp4" }],
    },
  };
}

export default async function ProjectVideoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  const video = project && projectVideo(project);
  if (!project || !video) notFound();

  // The other clips, so every watch page links to every other one.
  const otherFlyovers = (await getAllProjects())
    .filter((p) => p.slug !== slug)
    .map((p) => ({ project: p, video: projectVideo(p) }))
    .filter((f) => f.video !== null);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Portfolio", path: "/portfolio" },
          { name: project.title, path: `/portfolio/${slug}` },
          { name: "Drone flyover", path: video.path },
        ]}
      />
      <VideoJsonLd video={video} />

      <div className="mx-auto max-w-5xl px-5 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-24">
        <Link
          href={`/portfolio/${slug}`}
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm"
        >
          <Icon name="arrow-left" className="h-3.5 w-3.5" />
          {project.title}
        </Link>

        <Eyebrow className="mt-6">Drone flyover · {project.location}</Eyebrow>
        <h1 className="font-display mt-3 text-3xl leading-[1.08] font-medium tracking-tight text-balance sm:text-5xl">
          {video.title}
        </h1>

        {/* The clip is the page: first thing below the title, full frame, with controls. */}
        <div className="border-border/40 relative mt-6 aspect-[4/3] overflow-hidden rounded-2xl border bg-black sm:mt-8">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            controls
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={video.poster}
          >
            <source src={video.src} type="video/mp4" />
          </video>
        </div>

        <p className="text-foreground/85 mt-6 max-w-3xl text-lg leading-relaxed">
          {video.description}
        </p>

        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:grid-cols-4 sm:gap-x-10">
          <Meta label="Location">{project.location}</Meta>
          <Meta label="Built">{project.year}</Meta>
          <Meta label="Type">{project.category}</Meta>
          <Meta label="Length">{video.durationLabel}</Meta>
        </dl>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg" className="h-12 px-6 text-base">
            <Link href={`/portfolio/${slug}`}>
              See the full project
              <Icon name="arrow-right" className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
            <Link href="/portfolio">All projects</Link>
          </Button>
        </div>

        <div className="border-border/40 mt-14 grid gap-12 border-t pt-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
              What to look for
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              {video.durationSeconds} seconds from the air is enough to see what still photos
              flatten: how the deck sits against the house and the lot, how the levels connect, and
              where the roofline lands. Watch for:
            </p>
            {video.notes.length > 0 ? (
              <ul className="mt-5 space-y-3">
                {video.notes.map((note) => (
                  <li
                    key={note}
                    className="text-foreground/85 flex items-start gap-3 leading-relaxed"
                  >
                    <Icon name="check" className="text-haka-cream mt-1 h-4 w-4 shrink-0" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            <h2 className="font-display mt-12 text-2xl font-medium tracking-tight sm:text-3xl">
              About this build
            </h2>
            <p className="text-foreground/85 mt-4 text-base leading-relaxed">{project.summary}</p>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              We built this {project.category.toLowerCase()} in {project.location} in {project.year}
              . The brief, what we built, the spec list and the photo gallery are on the{" "}
              <Link
                href={`/portfolio/${slug}`}
                className="text-foreground font-medium underline underline-offset-4"
              >
                project page
              </Link>
              .
            </p>
          </div>

          <aside className="space-y-10">
            <div>
              <h2 className="font-display text-xl font-medium tracking-tight sm:text-2xl">
                Why we fly the drone
              </h2>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-base">
                A deck is drawn from above and lived in from the yard, and a flyover shows both at
                once: the footprint against the house, where a roof meets the wall, how the stairs
                land, and how much of the lot the structure actually uses. We shoot each clip once
                the build is signed off, so what you see is the finished outdoor room, not a
                rendering.
              </p>
            </div>

            {otherFlyovers.length > 0 ? (
              <div>
                <h2 className="font-display text-xl font-medium tracking-tight sm:text-2xl">
                  More flyovers
                </h2>
                <ul className="mt-3 space-y-3">
                  {otherFlyovers.map(({ project: p, video: v }) => (
                    <li key={p.slug}>
                      <Link
                        href={v!.path}
                        className="text-foreground/85 hover:text-foreground inline-flex items-start gap-2 text-sm leading-snug font-medium sm:text-base"
                      >
                        <Icon name="play" className="mt-1 h-3.5 w-3.5 shrink-0 fill-current" />
                        <span>
                          {v!.title}
                          <span className="text-muted-foreground font-normal">
                            {" "}
                            · {p.location} · {v!.durationLabel}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div>
              <h2 className="font-display text-xl font-medium tracking-tight sm:text-2xl">
                Want one like it?
              </h2>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-base">
                Every Haka deck starts with a site visit. Tell us the lot, the levels you want to
                connect and whether a roof is on the list, and we come out, measure, and write an
                itemized estimate — free, anywhere within an hour of Denver or Colorado Springs. Our{" "}
                <Link
                  href="/deck-cost-guide-denver"
                  className="text-foreground underline underline-offset-4"
                >
                  cost guide
                </Link>{" "}
                covers what covered and two-level decks typically run, and the{" "}
                <Link
                  href="/deck-design-ideas-colorado"
                  className="text-foreground underline underline-offset-4"
                >
                  design ideas gallery
                </Link>{" "}
                has more builds like this one.
              </p>
            </div>
          </aside>
        </div>
      </div>

      <CtaFinal />
    </>
  );
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-muted-foreground text-xs tracking-widest uppercase">{label}</dt>
      <dd className="mt-1 text-base">{children}</dd>
    </div>
  );
}
