import type { Metadata } from "next";
import { Eyebrow, Section } from "@/components/sections/section";
import { ProjectCard } from "@/components/portfolio/project-card";
import { CtaFinal } from "@/components/sections/cta-final";
import { getAllProjects } from "@/lib/portfolio";

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
          A selection of recent builds across the Front Range. Each one starts with a
          conversation, ends with a handshake, and the photos in between are everything that
          happened on the way.
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

      <CtaFinal />
    </>
  );
}
