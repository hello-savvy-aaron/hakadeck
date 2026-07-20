import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import type { Faq } from "@/lib/faqs";

const SERVICES_DIR = join(process.cwd(), "content", "services");

export type ServiceMeta = {
  slug: string;
  // Short display name for cards/hub (e.g. "Composite Decks").
  name: string;
  // Local + category H1 for the detail page (e.g. "Composite Deck Builder…").
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  // GBP-aligned category label shown as the eyebrow.
  category: string;
  image: string;
  bullets: string[];
  order: number;
  // Service-specific Q&As rendered as an accordion + FAQPage JSON-LD.
  faqs: Faq[];
};

export type Service = ServiceMeta & {
  body: string;
};

export async function getAllServices(): Promise<ServiceMeta[]> {
  if (!existsSync(SERVICES_DIR)) return [];
  const files = (await readdir(SERVICES_DIR)).filter((f) => f.endsWith(".mdx"));
  const services = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = await readFile(join(SERVICES_DIR, file), "utf8");
      const { data } = matter(raw);
      return serviceFromFrontmatter(slug, data);
    }),
  );
  return services.sort((a, b) => a.order - b.order);
}

export async function getService(slug: string): Promise<Service | null> {
  const path = join(SERVICES_DIR, `${slug}.mdx`);
  if (!existsSync(path)) return null;
  const raw = await readFile(path, "utf8");
  const { data, content } = matter(raw);
  return { ...serviceFromFrontmatter(slug, data), body: content };
}

function serviceFromFrontmatter(slug: string, data: Record<string, unknown>): ServiceMeta {
  return {
    slug,
    name: data.name as string,
    title: data.title as string,
    metaTitle: data.metaTitle as string,
    metaDescription: data.metaDescription as string,
    summary: data.summary as string,
    category: data.category as string,
    image: data.image as string,
    bullets: (data.bullets as string[]) ?? [],
    order: (data.order as number) ?? 99,
    faqs: (data.faqs as Faq[]) ?? [],
  };
}
