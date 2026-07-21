import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, MapPin } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Eyebrow, Section, SectionHeading } from "@/components/sections/section";
import { CtaFinal } from "@/components/sections/cta-final";
import { ProjectCard } from "@/components/portfolio/project-card";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-jsonld";
import { getAllProjects, getProject } from "@/lib/portfolio";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/portfolio/${slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [project.cover],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  // Cross-link sibling projects so every build has more than one incoming
  // internal link. A cyclic window (the next 3 projects, wrapping around) spreads
  // inbound links evenly; a fixed top-3 left the oldest builds reachable only
  // from the /portfolio index.
  const allProjects = await getAllProjects();
  const projectIdx = allProjects.findIndex((p) => p.slug === slug);
  const moreProjects = [1, 2, 3]
    .map((offset) => allProjects[(projectIdx + offset) % allProjects.length])
    .filter((p) => p.slug !== slug);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Portfolio", path: "/portfolio" },
          { name: project.title, path: `/portfolio/${slug}` },
        ]}
      />
      <Section top="loose" bottom="tight">
        <Link
          href="/portfolio"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All projects
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>{project.category}</Eyebrow>
            <h1 className="font-display mt-4 text-4xl leading-[1.04] font-medium tracking-tight text-balance sm:text-5xl lg:text-7xl">
              {project.title}
            </h1>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:gap-x-10">
            <Meta label="Location">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="text-haka-cream h-3.5 w-3.5" />
                {project.location}
              </span>
            </Meta>
            <Meta label="Year">{project.year}</Meta>
            <Meta label="Type">{project.category}</Meta>
            <Meta label="Status">Completed</Meta>
          </dl>
        </div>
      </Section>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {project.video ? (
          <div className="border-border/40 relative aspect-[16/9] overflow-hidden rounded-2xl border">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              playsInline
              muted
              loop
              autoPlay
              preload="metadata"
              poster={project.videoPoster}
            >
              <source src={project.video} type="video/mp4" />
            </video>
          </div>
        ) : (
          <div className="border-border/40 relative aspect-[16/9] overflow-hidden rounded-2xl border">
            <Image
              src={project.cover}
              alt={`${project.title} by Haka Decks in ${project.location}`}
              fill
              priority
              sizes="(min-width: 1216px) 1088px, 100vw"
              className="object-cover"
            />
          </div>
        )}
      </div>

      <Section top="tight" bottom="tight">
        <article className="prose prose-haka mx-auto max-w-3xl">
          <p className="text-foreground/85 lead text-xl leading-relaxed">{project.summary}</p>
          <MDXRemote source={project.body} />
        </article>
      </Section>

      {project.gallery.length > 0 ? (
        <Section top="none">
          <Eyebrow>Gallery</Eyebrow>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((src, i) => (
              <li
                key={src}
                className={`border-border/40 relative overflow-hidden rounded-xl border ${
                  i % 5 === 0 ? "aspect-[4/5] sm:col-span-2 sm:aspect-[16/10]" : "aspect-[4/5]"
                }`}
              >
                <Image
                  src={src}
                  alt={`${project.title} in ${project.location} — gallery photo ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {moreProjects.length > 0 ? (
        <Section top="none">
          <Eyebrow>More projects</Eyebrow>
          <SectionHeading className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
            See another build.
          </SectionHeading>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {moreProjects.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

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
