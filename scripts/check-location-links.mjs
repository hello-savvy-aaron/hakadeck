/**
 * Fetches every external URL in the location pages' hub data (resources,
 * calendar, links) and reports anything that no longer returns 2xx/3xx.
 *
 * A dead .gov link on a "who to call" card is worse than no card, so run
 * this twice a year (and after every research merge):
 *
 *   node scripts/check-location-links.mjs [slug ...]
 *
 * 403/405 usually means a bot wall, not a dead page — spot-check those by
 * hand before changing anything.
 */
import { readdir, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import matter from "gray-matter";

const DIR = resolve(import.meta.dirname, "..", "content", "locations");
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36";

async function main() {
  const only = new Set(process.argv.slice(2));
  const files = (await readdir(DIR)).filter((f) => f.endsWith(".mdx"));
  const urls = new Map(); // url → Set<slug>
  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    if (only.size && !only.has(slug)) continue;
    const { data } = matter(await readFile(join(DIR, file), "utf8"));
    for (const list of [data.resources, data.calendar, data.links]) {
      for (const item of Array.isArray(list) ? list : []) {
        if (typeof item.url === "string") {
          if (!urls.has(item.url)) urls.set(item.url, new Set());
          urls.get(item.url).add(slug);
        }
      }
    }
  }

  const results = [];
  const list = [...urls.keys()];
  let next = 0;
  const worker = async () => {
    while (next < list.length) {
      const url = list[next++];
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), 20_000);
      try {
        const res = await fetch(url, {
          redirect: "follow",
          signal: ctl.signal,
          headers: { "user-agent": UA, accept: "text/html,*/*" },
        });
        if (res.status >= 400) results.push({ url, status: String(res.status) });
      } catch (err) {
        results.push({ url, status: err.name === "AbortError" ? "timeout" : err.message });
      } finally {
        clearTimeout(timer);
      }
    }
  };
  await Promise.all(Array.from({ length: 8 }, worker));

  results.sort((a, b) => a.url.localeCompare(b.url));
  for (const r of results) {
    const soft = r.status === "403" || r.status === "405";
    console.log(
      `${soft ? "warn " : "error"} ${r.status.padEnd(8)} ${r.url}  [${[...urls.get(r.url)].join(", ")}]`,
    );
  }
  const hard = results.filter((r) => r.status !== "403" && r.status !== "405").length;
  console.log(
    `\nchecked ${list.length} URLs across ${files.length} pages — ${hard} broken, ${results.length - hard} bot-walled`,
  );
  process.exit(hard ? 1 : 0);
}

main();
