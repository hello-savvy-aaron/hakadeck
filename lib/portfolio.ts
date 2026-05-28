import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const PORTFOLIO_DIR = join(process.cwd(), "content", "portfolio");

export type ProjectMeta = {
  slug: string;
  title: string;
  summary: string;
  location: string;
  year: number;
  category: string;
  cover: string;
  gallery: string[];
  video?: string;
  videoPoster?: string;
};

export type Project = ProjectMeta & {
  body: string;
};

export async function getAllProjects(): Promise<ProjectMeta[]> {
  if (!existsSync(PORTFOLIO_DIR)) return [];
  const files = (await readdir(PORTFOLIO_DIR)).filter((f) => f.endsWith(".mdx"));
  const projects = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = await readFile(join(PORTFOLIO_DIR, file), "utf8");
      const { data } = matter(raw);
      return projectFromFrontmatter(slug, data);
    }),
  );
  return projects.sort((a, b) => b.year - a.year);
}

export async function getProject(slug: string): Promise<Project | null> {
  const path = join(PORTFOLIO_DIR, `${slug}.mdx`);
  if (!existsSync(path)) return null;
  const raw = await readFile(path, "utf8");
  const { data, content } = matter(raw);
  return { ...projectFromFrontmatter(slug, data), body: content };
}

function projectFromFrontmatter(slug: string, data: Record<string, unknown>): ProjectMeta {
  return {
    slug,
    title: data.title as string,
    summary: data.summary as string,
    location: data.location as string,
    year: data.year as number,
    category: data.category as string,
    cover: data.cover as string,
    gallery: (data.gallery as string[]) ?? [],
    video: data.video as string | undefined,
    videoPoster: data.videoPoster as string | undefined,
  };
}
