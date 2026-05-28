/**
 * One-time conversion: docs/blog/*.md → web/content/blog/*.mdx with frontmatter.
 * Idempotent — safe to re-run if a source markdown file changes.
 */
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const DOCS = resolve(ROOT, "..", "docs", "blog");
const OUT = resolve(ROOT, "content", "blog");

type Meta = {
  date: string;
  description: string;
  category: string;
  cover?: string;
};

// Hand-curated metadata per post — adds polish the auto-extracted content can't.
const META: Record<string, Meta> = {
  "colorado-sun-days-deck-guide": {
    date: "2025-09-12",
    description:
      "Colorado's 300 days of sun are the best reason to build a deck — and the single biggest enemy of every deck we build. Here's how to plan for it.",
    category: "Climate & Materials",
    cover: "/assets/projects/ranch-drone/01.jpeg",
  },
  "composite-vs-natural-decking-guide": {
    date: "2026-01-22",
    description:
      "Composite vs. wood is the single biggest decision in any deck project — driving budget, maintenance, and resale value. Here's the no-nonsense breakdown.",
    category: "Materials",
    cover: "/assets/projects/double-decker/03.jpeg",
  },
  "concrete-vs-pavers-guide": {
    date: "2025-06-04",
    description:
      "Poured concrete or pavers? Cost, lifespan, maintenance, and the Colorado climate realities most homeowners don't think about until it's too late.",
    category: "Patios",
    cover: "/assets/projects/double-decker/06.jpeg",
  },
  "haka-warranties-guide": {
    date: "2025-11-08",
    description:
      "Three warranties cover every Haka deck — ours, the board manufacturer's, and the railing's. Here's exactly what each one does, and what it doesn't.",
    category: "Warranties",
    cover: "/assets/projects/ranch-drone/04.jpeg",
  },
  "polycarbonate-roof-covers-guide": {
    date: "2026-03-15",
    description:
      "A patio cover quietly doubles how much you use your outdoor space. Polycarbonate is the right material for most homes — and the wrong one for some.",
    category: "Covers & Pergolas",
    cover: "/assets/projects/double-decker/14.jpeg",
  },
};

async function main() {
  await mkdir(OUT, { recursive: true });
  const files = (await readdir(DOCS)).filter((f) => f.endsWith(".md"));
  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const meta = META[slug];
    if (!meta) {
      console.warn(`SKIP ${slug} — no curated metadata`);
      continue;
    }
    const raw = await readFile(join(DOCS, file), "utf8");
    const lines = raw.split("\n");
    const titleLine = lines.find((l) => l.startsWith("# "));
    const title = titleLine?.replace(/^#\s+/, "").trim() ?? slug;

    // Strip "# Title" and "*Posted by …*" boilerplate from body.
    const body = raw
      .replace(/^#\s+.*\n/m, "")
      .replace(/^\*Posted by[^\n]*\*\n/m, "")
      .trim();

    const wordCount = body.split(/\s+/).length;
    const readingMinutes = Math.max(2, Math.round(wordCount / 220));

    const frontmatter = [
      "---",
      `title: ${JSON.stringify(title)}`,
      `description: ${JSON.stringify(meta.description)}`,
      `date: ${meta.date}`,
      `category: ${JSON.stringify(meta.category)}`,
      meta.cover ? `cover: ${JSON.stringify(meta.cover)}` : null,
      `readingMinutes: ${readingMinutes}`,
      "---",
      "",
    ]
      .filter(Boolean)
      .join("\n");

    await writeFile(join(OUT, `${slug}.mdx`), frontmatter + body + "\n");
    console.log(`  wrote content/blog/${slug}.mdx  (${readingMinutes} min)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
