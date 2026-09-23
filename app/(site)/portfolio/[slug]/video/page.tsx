import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
          <ArrowLeft className="h-3.5 w-3.5" />
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
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
            <Link href="/portfolio">All projects</Link>
          </Button>
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
