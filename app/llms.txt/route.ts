import { buildLlmsIndex } from "@/lib/llms";

// /llms.txt — the llmstxt.org index for AI crawlers. Generated from the
// content libs at build time (force-static), so it never drifts from the
// pages that actually exist. Replaces the hand-maintained public/llms.txt.
export const dynamic = "force-static";

export async function GET() {
  const body = await buildLlmsIndex();
  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
