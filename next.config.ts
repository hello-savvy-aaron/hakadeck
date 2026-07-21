import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP fallback. AVIF runs ~20–30% smaller than WebP on the
    // deck photos (large areas of sky and decking compress well), and the
    // encode cost is paid once per variant then cached at the edge.
    formats: ["image/avif", "image/webp"],
    // The default 60s means Vercel re-optimizes far more often than these
    // assets change — they're content-hashed by path and only change on deploy.
    minimumCacheTTL: 31_536_000,
  },
  async redirects() {
    return [
      // Old Webflow URLs → new App Router paths
      { source: "/service", destination: "/services", permanent: true },
      { source: "/blog-post/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/project/:slug", destination: "/portfolio/:slug", permanent: true },
      // Map the old composite-vs-wood Webflow slug to the local one
      {
        source: "/blog/decking-materials-composite-vs-natural-wood",
        destination: "/blog/composite-vs-natural-decking-guide",
        permanent: true,
      },
      // Retired project page (removed July 2026)
      { source: "/portfolio/pergola-patio-screen", destination: "/portfolio", permanent: true },
      // Template-residue portfolio slugs → portfolio index (no real pages to redirect to)
      { source: "/portfolio/deck-stairs", destination: "/portfolio", permanent: true },
      { source: "/portfolio/outdoor-space", destination: "/portfolio", permanent: true },
      { source: "/portfolio/sustainable-habitat", destination: "/portfolio", permanent: true },
      { source: "/portfolio/tree-house", destination: "/portfolio", permanent: true },
    ];
  },
};

export default nextConfig;
