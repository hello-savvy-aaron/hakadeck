import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import type { Faq } from "@/lib/faqs";

const LOCATIONS_DIR = join(process.cwd(), "content", "locations");

export type LocationMeta = {
  slug: string;
  // City name for cards, headings, and areaServed (e.g. "Centennial").
  name: string;
  // Local-intent H1 for the detail page (e.g. "Deck Builder in Centennial, Colorado").
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  image: string;
  // Optional override for the hero image's alt text. The default asserts the
  // build is "near" this city — set this on pages whose hero shows a project
  // from elsewhere so the alt stays truthful.
  imageAlt?: string;
  bullets: string[];
  // Portfolio slugs of real builds in or near this city — curated, not
  // auto-matched, so "near" stays honest.
  projects: string[];
  // Query string for the embedded Google map (e.g. "Centennial, CO").
  mapQuery: string;
  order: number;
  // City-specific Q&As rendered as an accordion + FAQPage JSON-LD.
  faqs: Faq[];
};

export type Location = LocationMeta & {
  body: string;
};

export async function getAllLocations(): Promise<LocationMeta[]> {
  if (!existsSync(LOCATIONS_DIR)) return [];
  const files = (await readdir(LOCATIONS_DIR)).filter((f) => f.endsWith(".mdx"));
  const locations = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = await readFile(join(LOCATIONS_DIR, file), "utf8");
      const { data } = matter(raw);
      return locationFromFrontmatter(slug, data);
    }),
  );
  return locations.sort((a, b) => a.order - b.order);
}

export async function getLocation(slug: string): Promise<Location | null> {
  const path = join(LOCATIONS_DIR, `${slug}.mdx`);
  if (!existsSync(path)) return null;
  const raw = await readFile(path, "utf8");
  const { data, content } = matter(raw);
  return { ...locationFromFrontmatter(slug, data), body: content };
}

function locationFromFrontmatter(slug: string, data: Record<string, unknown>): LocationMeta {
  return {
    slug,
    name: data.name as string,
    title: data.title as string,
    metaTitle: data.metaTitle as string,
    metaDescription: data.metaDescription as string,
    summary: data.summary as string,
    image: data.image as string,
    imageAlt: data.imageAlt as string | undefined,
    bullets: (data.bullets as string[]) ?? [],
    projects: (data.projects as string[]) ?? [],
    mapQuery: data.mapQuery as string,
    order: (data.order as number) ?? 99,
    faqs: (data.faqs as Faq[]) ?? [],
  };
}
