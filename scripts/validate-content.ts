/**
 * Validates every MDX file under content/ before it can ship.
 *
 * The loaders in lib/*.ts read frontmatter with gray-matter and cast the result
 * (`data.title as string`), so a missing or misspelled key doesn't fail the
 * build — it renders `undefined` into the page or an empty section. That was
 * tolerable while every file was hand-written. Now that content also arrives by
 * pull request from the content agent, this script is the gate: it runs in CI,
 * and a PR that breaks a schema, points at a missing image, references a
 * portfolio slug that doesn't exist, or links to a page that was never built
 * cannot merge.
 *
 * Errors block. Warnings (SEO length targets) are reported and don't fail —
 * some long-standing pages exceed them and that's a deliberate call, not a bug.
 *
 * Run: npm run content:validate
 */
import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const ROOT = resolve(import.meta.dirname, "..");
const CONTENT = join(ROOT, "content");
const PUBLIC = join(ROOT, "public");
const SITE_ROUTES = join(ROOT, "app", "(site)");

const Faq = z.object({ q: z.string().min(1), a: z.string().min(1) });

// YAML gives us a Date for unquoted dates and a string for quoted ones; the
// blog loader normalizes both, so accept both here.
const DateLike = z.union([z.date(), z.string().min(1)]);

const BlogFrontmatter = z.object({
  title: z.string().min(1),
  metaTitle: z.string().min(1).optional(),
  description: z.string().min(1),
  date: DateLike,
  category: z.string().min(1),
  cover: z.string().startsWith("/").optional(),
  readingMinutes: z.number().int().positive(),
});

const LocationFrontmatter = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  summary: z.string().min(1),
  image: z.string().startsWith("/"),
  imageAlt: z.string().min(1).optional(),
  mapQuery: z.string().min(1),
  order: z.number().int(),
  bullets: z.array(z.string().min(1)).min(1),
  projects: z.array(z.string().min(1)),
  faqs: z.array(Faq).min(1),
});

const ServiceFrontmatter = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  summary: z.string().min(1),
  category: z.string().min(1),
  image: z.string().startsWith("/"),
  order: z.number().int(),
  bullets: z.array(z.string().min(1)).min(1),
  faqs: z.array(Faq).min(1),
});

const ProjectFrontmatter = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  location: z.string().min(1),
  year: z.number().int(),
  category: z.string().min(1),
  cover: z.string().startsWith("/"),
  gallery: z.array(z.string().startsWith("/")),
  video: z.string().startsWith("/").optional(),
  videoPoster: z.string().startsWith("/").optional(),
});

const SCHEMAS = {
  blog: BlogFrontmatter,
  locations: LocationFrontmatter,
  services: ServiceFrontmatter,
  portfolio: ProjectFrontmatter,
} as const;

type ContentType = keyof typeof SCHEMAS;
const TYPES = Object.keys(SCHEMAS) as ContentType[];

/** Frontmatter keys whose values are public/ paths that must resolve. */
const IMAGE_KEYS = ["cover", "image", "video", "videoPoster"] as const;

const SEO_LIMITS: Record<string, number> = {
  metaTitle: 60,
  metaDescription: 160,
  description: 160,
};

type Problem = { file: string; message: string };

async function main() {
  const slugs = await collectSlugs();
  const staticRoutes = await collectStaticRoutes();
  const errors: Problem[] = [];
  const warnings: Problem[] = [];

  for (const type of TYPES) {
    const dir = join(CONTENT, type);
    if (!existsSync(dir)) continue;

    for (const file of (await readdir(dir)).filter((f) => f.endsWith(".mdx"))) {
      const rel = `content/${type}/${file}`;
      const slug = file.replace(/\.mdx$/, "");
      const { data, content } = matter(await readFile(join(dir, file), "utf8"));

      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
        errors.push({ file: rel, message: `slug "${slug}" is not lowercase kebab-case` });
      }

      const parsed = SCHEMAS[type].safeParse(data);
      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          const path = issue.path.join(".") || "(root)";
          errors.push({ file: rel, message: `frontmatter.${path}: ${issue.message}` });
        }
        continue;
      }

      for (const key of IMAGE_KEYS) {
        const value = (data as Record<string, unknown>)[key];
        if (typeof value === "string" && !existsSync(join(PUBLIC, value))) {
          errors.push({ file: rel, message: `${key}: "${value}" is missing from public/` });
        }
      }
      for (const src of asStringArray(data.gallery)) {
        if (!existsSync(join(PUBLIC, src))) {
          errors.push({ file: rel, message: `gallery: "${src}" is missing from public/` });
        }
      }

      // Curated, not auto-matched — lib/locations.ts relies on these being real
      // builds so "near this city" stays honest.
      for (const project of asStringArray(data.projects)) {
        if (!slugs.portfolio.has(project)) {
          errors.push({
            file: rel,
            message: `projects: "${project}" is not a portfolio slug`,
          });
        }
      }

      for (const [key, limit] of Object.entries(SEO_LIMITS)) {
        const value = (data as Record<string, unknown>)[key];
        if (typeof value === "string" && value.length > limit) {
          warnings.push({
            file: rel,
            message: `${key} is ${value.length} chars (target ${limit})`,
          });
        }
      }

      for (const href of internalLinks(content)) {
        if (!routeExists(href, slugs, staticRoutes)) {
          errors.push({ file: rel, message: `internal link "${href}" does not resolve` });
        }
      }
    }
  }

  report(errors, warnings);
  process.exit(errors.length > 0 ? 1 : 0);
}

async function collectSlugs(): Promise<Record<ContentType, Set<string>>> {
  const entries = await Promise.all(
    TYPES.map(async (type) => {
      const dir = join(CONTENT, type);
      if (!existsSync(dir)) return [type, new Set<string>()] as const;
      const files = (await readdir(dir)).filter((f) => f.endsWith(".mdx"));
      return [type, new Set(files.map((f) => f.replace(/\.mdx$/, "")))] as const;
    }),
  );
  return Object.fromEntries(entries) as Record<ContentType, Set<string>>;
}

/** Top-level routes under app/(site) that own a page.tsx — /faq, /financing, … */
async function collectStaticRoutes(): Promise<Set<string>> {
  const routes = new Set<string>();
  for (const entry of await readdir(SITE_ROUTES, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith("[")) continue;
    if (existsSync(join(SITE_ROUTES, entry.name, "page.tsx"))) routes.add(entry.name);
  }
  return routes;
}

function internalLinks(body: string): string[] {
  const seen = new Set<string>();
  for (const match of body.matchAll(/]\((\/[^)\s"']*)/g)) {
    const href = match[1];
    if (href) seen.add(href);
  }
  return [...seen];
}

function routeExists(
  href: string,
  slugs: Record<ContentType, Set<string>>,
  staticRoutes: Set<string>,
): boolean {
  const path = href.split(/[#?]/)[0]?.replace(/\/+$/, "") ?? "";
  if (path === "") return true; // bare "/" or "#anchor"

  // Some links point at files in public/ (PDFs, images) rather than routes.
  if (existsSync(join(PUBLIC, path))) return true;

  const [first, second, ...rest] = path.replace(/^\//, "").split("/");
  if (!first || rest.length > 0) return false;

  const collection = TYPES.find((t) => t === first);
  if (!second) return Boolean(collection) || staticRoutes.has(first);
  return collection ? slugs[collection].has(second) : false;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

function report(errors: Problem[], warnings: Problem[]) {
  // Warnings are summarized by default. Much of the hand-written corpus runs
  // long on meta descriptions deliberately, and printing 30+ lines on every CI
  // run is how people learn to scroll past the errors too. Pass --verbose to
  // see them all.
  const verbose = process.argv.includes("--verbose");
  if (verbose) {
    for (const w of warnings) console.warn(`warn  ${w.file}: ${w.message}`);
  } else if (warnings.length) {
    console.warn(`${warnings.length} SEO length warning(s) — rerun with --verbose to list`);
  }

  for (const e of errors) console.error(`error ${e.file}: ${e.message}`);

  const counts = `${errors.length} error(s), ${warnings.length} warning(s)`;
  console.log(
    errors.length
      ? `\ncontent:validate failed — ${counts}`
      : `\ncontent:validate passed — ${counts}`,
  );
}

// Not top-level await: tsx transforms this file to CJS (the repo isn't ESM).
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
