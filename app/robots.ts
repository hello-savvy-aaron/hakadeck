import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// AI crawlers, named explicitly. The wildcard rule already allows them, but a
// named rule survives any future tightening of `*` and reads as a deliberate
// "yes" to the engines that now send leads (GA4 "AI Assistant" channel).
// Search-index bots (GPTBot/OAI-SearchBot feed ChatGPT search, ClaudeBot →
// Claude, PerplexityBot → Perplexity, Google-Extended → Gemini/AI Overviews,
// Applebot-Extended → Apple Intelligence, Bingbot → Copilot) and their
// on-demand "user" fetchers are both listed so citations resolve.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "Amazonbot",
  "meta-externalagent",
  "CCBot",
];

const DISALLOW = ["/api/", "/no-track"];

export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, "");
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_CRAWLERS, allow: ["/", "/llms.txt", "/llms-full.txt"], disallow: DISALLOW },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
