/**
 * Folds local-hub research (one JSON file per location slug) into the
 * frontmatter of content/locations/<slug>.mdx.
 *
 * The research JSON carries the hub keys — facts, calendar, resources, links,
 * and optionally events (annual traditions) — in the shape lib/locations.ts
 * reads. This script replaces exactly those keys in the frontmatter, leaves
 * every other key's text byte-for-byte untouched (no YAML re-serialisation of
 * the whole file), sorts the calendar chronologically, and stamps
 * `hubUpdated` with today's date. The MDX body is never touched.
 *
 * Usage:
 *   node scripts/merge-location-research.mjs <dir-of-json | file.json ...>
 *
 * Re-run any time a season's research is refreshed; the research files
 * themselves are throwaway (they live in the session scratchpad), the .mdx
 * is the source of truth.
 */
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { basename, join, resolve } from "node:path";
import matter from "gray-matter";

const ROOT = resolve(import.meta.dirname, "..");
const DIR = join(ROOT, "content", "locations");

// Frontmatter keys owned by this script, in the order they are emitted.
const HUB_KEYS = ["events", "facts", "calendar", "resources", "links", "hubUpdated"];
const FIELD_ORDER = {
  events: ["name", "when", "note"],
  facts: ["label", "value"],
  calendar: ["name", "date", "endDate", "time", "venue", "note", "url", "host", "tag"],
  resources: ["category", "label", "name", "phone", "url", "address", "hours", "note", "featured"],
  links: ["label", "url", "note"],
};

const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Denver" }).format(new Date());

function yamlStr(value) {
  const flat = String(value)
    .replace(/\s*\n\s*/g, " ")
    .trim();
  return `"${flat.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function emitList(key, items) {
  if (!items.length) return [`${key}: []`];
  const lines = [`${key}:`];
  for (const item of items) {
    let first = true;
    for (const field of FIELD_ORDER[key]) {
      const v = item[field];
      if (v === undefined || v === null || v === "") continue;
      if (typeof v !== "string" && typeof v !== "boolean") {
        throw new Error(`${key}.${field}: unsupported value ${JSON.stringify(v)}`);
      }
      lines.push(`${first ? "  - " : "    "}${field}: ${typeof v === "boolean" ? v : yamlStr(v)}`);
      first = false;
    }
  }
  return lines;
}

/** Drop the top-level blocks for `keys` from raw frontmatter text, keeping everything else verbatim. */
function stripKeys(text, keys) {
  const out = [];
  let skipping = false;
  for (const line of text.split("\n")) {
    const m = line.match(/^([A-Za-z][\w-]*):/);
    if (m) skipping = keys.includes(m[1]);
    if (!skipping) out.push(line);
  }
  return out.join("\n").replace(/\n+$/, "");
}

async function mergeOne(jsonPath) {
  const research = JSON.parse(await readFile(jsonPath, "utf8"));
  const slug = basename(jsonPath, ".json");
  if (research.slug !== slug) throw new Error(`${jsonPath}: slug "${research.slug}" != "${slug}"`);
  for (const key of ["facts", "calendar", "resources", "links"]) {
    if (!Array.isArray(research[key])) throw new Error(`${jsonPath}: "${key}" must be an array`);
  }

  const mdxPath = join(DIR, `${slug}.mdx`);
  const raw = await readFile(mdxPath, "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${mdxPath}: no frontmatter block`);
  const [, frontmatter, body] = m;
  const existing = matter(raw).data;

  const events = research.events ?? existing.events ?? [];
  const calendar = [...research.calendar].sort((a, b) =>
    a.date < b.date ? -1 : a.date > b.date ? 1 : a.name.localeCompare(b.name),
  );
  const emitted = [
    ...emitList("events", events),
    ...emitList("facts", research.facts),
    ...emitList("calendar", calendar),
    ...emitList("resources", research.resources),
    ...emitList("links", research.links),
    `hubUpdated: "${today}"`,
  ];
  const next = `---\n${stripKeys(frontmatter, HUB_KEYS)}\n${emitted.join("\n")}\n---\n${body}`;

  // Round-trip: what we wrote must parse back to what we were given.
  const parsed = matter(next).data;
  const counts = {
    events: events.length,
    facts: research.facts.length,
    calendar: calendar.length,
    resources: research.resources.length,
    links: research.links.length,
  };
  for (const [key, n] of Object.entries(counts)) {
    const got = Array.isArray(parsed[key]) ? parsed[key].length : -1;
    if (got !== n) throw new Error(`${slug}: ${key} round-trip mismatch (${got} != ${n})`);
  }
  for (const key of Object.keys(existing)) {
    if (!HUB_KEYS.includes(key) && JSON.stringify(parsed[key]) !== JSON.stringify(existing[key])) {
      throw new Error(`${slug}: untouched key "${key}" changed`);
    }
  }
  for (const item of parsed.calendar) {
    if (!(item.date instanceof Date) && typeof item.date !== "string") {
      throw new Error(`${slug}: calendar date did not survive the round trip`);
    }
  }

  await writeFile(mdxPath, next);
  console.log(
    `${slug}: events=${counts.events} facts=${counts.facts} calendar=${counts.calendar} resources=${counts.resources} links=${counts.links}`,
  );
}

async function main() {
  const args = process.argv.slice(2);
  if (!args.length) {
    console.error("usage: node scripts/merge-location-research.mjs <dir-of-json | file.json ...>");
    process.exit(2);
  }
  const files = [];
  for (const arg of args) {
    const path = resolve(arg);
    if ((await stat(path)).isDirectory()) {
      // Agents park scratch downloads next to their output as _name.json — skip those.
      for (const f of (await readdir(path))
        .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
        .sort()) {
        files.push(join(path, f));
      }
    } else {
      files.push(path);
    }
  }
  let failed = 0;
  for (const file of files) {
    try {
      await mergeOne(file);
    } catch (err) {
      failed++;
      console.error(`error ${basename(file)}: ${err.message}`);
    }
  }
  console.log(`\nmerged ${files.length - failed}/${files.length}`);
  process.exit(failed ? 1 : 0);
}

main();
