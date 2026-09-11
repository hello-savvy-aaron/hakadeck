#!/usr/bin/env node
/**
 * Ping IndexNow with every URL in the live sitemap (or a list you pass in).
 *
 * Why: Bing's index feeds ChatGPT search, Copilot, DuckDuckGo and Yandex.
 * IndexNow tells those engines about new/changed pages within minutes instead
 * of waiting for a recrawl — the cheapest "get cited by AI faster" lever there
 * is. Google ignores IndexNow (it uses the sitemap), so run this after any
 * content deploy in addition to the usual push.
 *
 * Key: the file public/<key>.txt is the proof-of-ownership Bing fetches. The
 * key itself is read from ~/.config/haka/indexnow-key (or INDEXNOW_KEY), and
 * must match that filename. Rotating the key = new file + new config value.
 *
 * Run: npm run indexnow                       (every sitemap URL)
 *      npm run indexnow -- /blog/foo /faq     (just these paths)
 */
import { readFileSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const HOST = "www.hakadecks.com";
const KEY_FILE = join(homedir(), ".config", "haka", "indexnow-key");
const ENDPOINT = "https://api.indexnow.org/IndexNow";

function key() {
  if (process.env.INDEXNOW_KEY) return process.env.INDEXNOW_KEY.trim();
  if (existsSync(KEY_FILE)) return readFileSync(KEY_FILE, "utf8").trim();
  console.error(`Missing IndexNow key. Put it in ${KEY_FILE} or set INDEXNOW_KEY.`);
  process.exit(1);
}

async function sitemapUrls() {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function main() {
  const k = key();
  const args = process.argv.slice(2);
  const urlList = args.length
    ? args.map((p) =>
        p.startsWith("http") ? p : `https://${HOST}${p.startsWith("/") ? p : `/${p}`}`,
      )
    : await sitemapUrls();

  // Sanity-check the key file is actually being served before we burn a call.
  const proof = await fetch(`https://${HOST}/${k}.txt`);
  if (!proof.ok || (await proof.text()).trim() !== k) {
    console.error(`Key file https://${HOST}/${k}.txt is not live yet — deploy first.`);
    process.exit(1);
  }

  // IndexNow accepts up to 10,000 URLs per POST; chunk defensively anyway.
  for (let i = 0; i < urlList.length; i += 1000) {
    const chunk = urlList.slice(i, i + 1000);
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: k,
        keyLocation: `https://${HOST}/${k}.txt`,
        urlList: chunk,
      }),
    });
    // 200 = ok, 202 = accepted (key validation pending). Anything else is a problem.
    console.log(`IndexNow: ${chunk.length} URLs → HTTP ${res.status} ${res.statusText}`);
    if (res.status >= 400) {
      console.error(await res.text());
      process.exit(1);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
