import type { Metadata } from "next";
import Image from "next/image";
import { Eyebrow, Section, SectionHeading } from "@/components/sections/section";
import { ProjectCard } from "@/components/portfolio/project-card";
import { CtaFinal } from "@/components/sections/cta-final";
import { getAllProjects } from "@/lib/portfolio";
import { FIELD_PHOTOS } from "@/lib/field-gallery";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A selection of decks, pergolas, and outdoor living spaces Haka has built across the Front Range.",
  alternates: { canonical: "/portfolio" },
};

export default async function PortfolioPage() {
  const projects = await getAllProjects();

  return (
    <>
      <Section top="loose" bottom="tight">
        <Eyebrow>Portfolio</Eyebrow>
        <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[1.02] font-medium tracking-tight text-balance sm:text-6xl lg:text-8xl">
          Decks worth showing off.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
          A selection of recent builds across the Front Range. Each one starts with a conversation,
          ends with a handshake, and the photos in between are everything that happened on the way.
        </p>
      </Section>

      <Section top="none">
        <ul className="grid gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} featured />
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <Eyebrow>From the job site</Eyebrow>
        <SectionHeading className="mt-4 max-w-3xl">
          More of what we&rsquo;ve been building.
        </SectionHeading>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
          Decks, porches, patio covers, and railings from around the Front Range — the ones that
          didn&rsquo;t get a full write-up, plus a few shots from the middle of the work.
        </p>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {FIELD_PHOTOS.map((photo) => (
            <li key={photo.src}>
              <figure className="border-border/40 bg-card/40 overflow-hidden rounded-xl border">
                <div className="bg-muted relative aspect-[4/3]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="text-muted-foreground p-3 text-xs leading-relaxed sm:text-sm">
                  {photo.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Section>

      <CtaFinal />
    </>
  );
}
