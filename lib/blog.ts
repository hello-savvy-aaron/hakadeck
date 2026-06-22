import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const BLOG_DIR = join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  // Optional SEO <title> (≤60 chars, brand included). Keeps the long, punchy
  // `title` as the on-page H1 while the search title stays under the limit.
  metaTitle?: string;
  description: string;
  date: string;
  category: string;
  cover?: string;
  readingMinutes: number;
};

export type Post = PostMeta & {
  body: string;
};

export async function getAllPosts(): Promise<PostMeta[]> {
  if (!existsSync(BLOG_DIR)) return [];
  const files = (await readdir(BLOG_DIR)).filter((f) => f.endsWith(".mdx"));
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = await readFile(join(BLOG_DIR, file), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title as string,
        metaTitle: data.metaTitle as string | undefined,
        description: data.description as string,
        date: toDateString(data.date),
        category: data.category as string,
        cover: data.cover as string | undefined,
        readingMinutes: data.readingMinutes as number,
      };
    }),
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

export async function getPost(slug: string): Promise<Post | null> {
  const path = join(BLOG_DIR, `${slug}.mdx`);
  if (!existsSync(path)) return null;
  const raw = await readFile(path, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title as string,
    metaTitle: data.metaTitle as string | undefined,
    description: data.description as string,
    date: toDateString(data.date),
    category: data.category as string,
    cover: data.cover as string | undefined,
    readingMinutes: data.readingMinutes as number,
    body: content,
  };
}
