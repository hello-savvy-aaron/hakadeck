import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ProjectMeta } from "@/lib/portfolio";

export function ProjectCard({ project, featured = false }: { project: ProjectMeta; featured?: boolean }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group border-border/40 bg-card/40 hover:border-border block overflow-hidden rounded-2xl border transition-colors"
    >
      <div
        className={`bg-muted relative overflow-hidden ${featured ? "aspect-[16/10]" : "aspect-[4/3]"}`}
      >
        <Image
          src={project.cover}
          alt={`${project.title} — ${project.location}`}
          fill
          sizes={featured ? "(min-width: 1024px) 60vw, 90vw" : "(min-width: 1024px) 50vw, 90vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 from-black/70 to-transparent bg-gradient-to-t p-6">
          <div className="text-white/70 flex items-center gap-2 text-xs tracking-widest uppercase">
            <span>{project.category}</span>
            <span aria-hidden>•</span>
            <span>{project.location}</span>
          </div>
          <h3 className="font-display mt-2 text-2xl font-medium tracking-tight text-white sm:text-3xl">
            {project.title}
          </h3>
        </div>
      </div>
      <div className="flex items-start justify-between gap-6 p-6">
        <p className="text-muted-foreground max-w-md text-sm leading-relaxed line-clamp-2">
          {project.summary}
        </p>
        <div className="text-foreground/80 group-hover:text-foreground inline-flex items-center gap-1 text-sm font-medium whitespace-nowrap">
          View
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
