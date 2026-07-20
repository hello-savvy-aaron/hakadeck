import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
