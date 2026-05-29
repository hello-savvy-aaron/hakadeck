/**
 * Sync curated assets from ../docs/ into web/public/assets/ with predictable paths.
 *
 *   pnpm tsx scripts/sync-assets.ts          # run, optimizing JPEGs through sharp
 *   pnpm tsx scripts/sync-assets.ts --dry    # list operations without writing
 *   pnpm tsx scripts/sync-assets.ts --raw    # copy bytes verbatim, no resize/re-encode
 *
 * Re-run after dropping new files into docs/.
 */
import { mkdir, copyFile, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import sharp from "sharp";

const DRY = process.argv.includes("--dry");
const RAW = process.argv.includes("--raw");
const ROOT = resolve(import.meta.dirname, "..");
const DOCS = resolve(ROOT, "..", "docs");
const OUT = resolve(ROOT, "public", "assets");

const MAX_W = 2400;
const JPEG_Q = 82;

type Op = { src: string; dst: string };

async function listJpegs(dir: string): Promise<string[]> {
  const entries = await readdir(dir);
  return entries
    .filter((f) => /\.jpe?g$/i.test(f) && !f.startsWith("."))
    .sort();
}

async function planShowcase(srcDir: string, projectSlug: string, videoName: string): Promise<Op[]> {
  const ops: Op[] = [];
  const photos = await listJpegs(srcDir);
  photos.forEach((file, i) => {
    const n = String(i + 1).padStart(2, "0");
    ops.push({ src: join(srcDir, file), dst: join(OUT, "projects", projectSlug, `${n}.jpeg`) });
  });
  ops.push({
    src: join(srcDir, videoName),
    dst: join(OUT, "projects", projectSlug, "drone.mp4"),
  });
  // No ffmpeg available — use the first photo as the video poster.
  if (photos[0]) {
    ops.push({
      src: join(srcDir, photos[0]),
      dst: join(OUT, "projects", projectSlug, "drone-poster.jpeg"),
    });
  }
  return ops;
}

async function plan(): Promise<Op[]> {
  const ops: Op[] = [
    // Certifications
    { src: join(DOCS, "deckorators-cert-elite.jpg"), dst: join(OUT, "certs", "deckorators-pro-elite.jpg") },
    { src: join(DOCS, "timber-tech.jpeg"), dst: join(OUT, "certs", "timber-tech.jpg") },
    { src: join(DOCS, "trex-logo.jpeg"), dst: join(OUT, "certs", "trex-logo.jpg") },
    { src: join(DOCS, "trex-platinum-certified.png"), dst: join(OUT, "certs", "trex-platinum.png") },
  ];

  // Reviews — copy as-is; the source already uses sensible names.
  const reviews = await readdir(join(DOCS, "reviews"));
  for (const f of reviews) {
    if (f.startsWith(".") || !/\.png$/i.test(f)) continue;
    ops.push({ src: join(DOCS, "reviews", f), dst: join(OUT, "reviews", f) });
  }

  ops.push(...(await planShowcase(join(DOCS, "showcase-1"), "double-decker", "double-decker-drone.mp4")));
  ops.push(...(await planShowcase(join(DOCS, "showcase-2"), "ranch-drone", "ranch-drone.mp4")));

  return ops;
}

async function run() {
  if (!existsSync(DOCS)) {
    console.error(`docs/ not found at ${DOCS}`);
    process.exit(1);
  }
  const ops = await plan();
  console.log(`${DRY ? "[dry-run] " : ""}${ops.length} files\n`);
  for (const { src, dst } of ops) {
    const rel = dst.replace(ROOT + "/", "");
    if (!existsSync(src)) {
      console.warn(`  MISS  ${src.replace(DOCS + "/", "docs/")}`);
      continue;
    }
    const isJpeg = /\.jpe?g$/i.test(dst);
    const willOptimize = isJpeg && !RAW;
    console.log(`  ${rel}${willOptimize ? "  (sharp)" : ""}`);
    if (DRY) continue;
    await mkdir(dirname(dst), { recursive: true });
    if (willOptimize) {
      const img = sharp(src);
      const meta = await img.metadata();
      const pipeline = meta.width && meta.width > MAX_W ? img.resize({ width: MAX_W }) : img;
      await pipeline.jpeg({ quality: JPEG_Q, mozjpeg: true }).toFile(dst);
    } else {
      await copyFile(src, dst);
    }
  }
  if (!DRY) {
    const size = await dirSize(OUT);
    console.log(`\nwrote ${(size / 1024 / 1024).toFixed(1)} MB to public/assets/`);
  }
}

async function dirSize(dir: string): Promise<number> {
  let total = 0;
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) total += await dirSize(p);
    else total += (await stat(p)).size;
  }
  return total;
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
