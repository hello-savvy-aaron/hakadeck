import { buildLlmsFull } from "@/lib/llms";

// /llms-full.txt — the index plus every service, post, and city page's full
// text as one markdown document, so an LLM can ingest the whole site in a
// single fetch (no JS, no nav chrome, absolute links). Built statically.
export const dynamic = "force-static";

export async function GET() {
  const body = await buildLlmsFull();
  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
