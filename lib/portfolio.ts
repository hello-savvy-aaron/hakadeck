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
  // Drone flyover clip. A project with the complete five-key record also gets
  // a dedicated watch page at /portfolio/<slug>/video — see projectVideo().
  // scripts/validate-content.ts enforces the all-or-nothing rule.
  video?: string;
  videoPoster?: string;
  /** What the clip shows, one or two sentences. Doubles as the watch page's
   *  meta description and the VideoObject description — keep it under ~160 chars. */
  videoDescription?: string;
  /** Upload date, YYYY-MM-DD. */
  videoDate?: string;
  /** Running time in whole seconds. */
  videoDuration?: number;
};

export type Project = ProjectMeta & {
  body: string;
};

/** A project's flyover as one self-contained record — see projectVideo(). */
export type ProjectVideo = {
  src: string;
  poster: string;
  title: string;
  description: string;
  /** YYYY-MM-DD */
  uploadDate: string;
  durationSeconds: number;
  /** "0:14" */
  durationLabel: string;
  /** Site-root-relative path of the clip's watch page. */
  path: string;
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

/**
 * The clip behind a project, or null when the frontmatter has no complete
 * video record. Google only indexes a video that is the main content of its
 * page (Search Console flags anything else as "Video isn't on a watch page"),
 * so every clip gets its own watch page at `path`; the project page and the
 * design-ideas gallery link there instead of embedding the file as indexable
 * content. Everything that needs the clip — the watch page, the VideoObject
 * JSON-LD, the video sitemap, llms.txt — reads this one record.
 */
export function projectVideo(project: ProjectMeta): ProjectVideo | null {
  const { video, videoPoster, videoDescription, videoDate, videoDuration } = project;
  if (!video || !videoPoster || !videoDescription || !videoDate || !videoDuration) return null;
  const minutes = Math.floor(videoDuration / 60);
  const seconds = String(videoDuration % 60).padStart(2, "0");
  return {
    src: video,
    poster: videoPoster,
    title: `${project.title} — Drone Flyover`,
    description: videoDescription,
    uploadDate: videoDate,
    durationSeconds: videoDuration,
    durationLabel: `${minutes}:${seconds}`,
    path: `/portfolio/${project.slug}/video`,
  };
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
    videoDescription: data.videoDescription as string | undefined,
    // An unquoted YAML date parses to a Date; accept either spelling.
    videoDate:
      data.videoDate instanceof Date
        ? data.videoDate.toISOString().slice(0, 10)
        : (data.videoDate as string | undefined),
    videoDuration: data.videoDuration as number | undefined,
  };
}
