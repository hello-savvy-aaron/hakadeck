import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllLocations } from "@/lib/locations";
import { getAllProjects, projectVideo } from "@/lib/portfolio";
import { getAllServices } from "@/lib/services";
import { guideRoutes } from "@/lib/guides";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();

  const staticPaths = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/blog",
    "/contact",
    "/locations",
    "/deck-cost-calculator",
    "/process",
    "/warranty",
    "/faq",
    "/financing",
    "/trex-deck-builder-denver",
    "/deckorators-deck-builder-denver",
    "/timbertech-deck-builder-denver",
    "/small-deck-builder-denver",
    // Free Guides & Tools system (hub + guides + gallery). The phase-two
    // estimator is intentionally excluded — it's unlinked and noindexed.
    ...guideRoutes,
  ];
  const staticEntries = staticPaths.map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const [posts, projects, services, locations] = await Promise.all([
    getAllPosts(),
    getAllProjects(),
    getAllServices(),
    getAllLocations(),
  ]);

  const serviceEntries = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const locationEntries = locations.map((l) => ({
    url: `${base}/locations/${l.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const postEntries = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.updated ?? p.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const projectEntries = projects.map((p) => ({
    url: `${base}/portfolio/${p.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  // Flyover watch pages, with the video-sitemap extension so Google gets the
  // clip's title, thumbnail, file, and length without having to discover them
  // by rendering (see app/(site)/portfolio/[slug]/video/page.tsx).
  const videoEntries = projects.flatMap((p) => {
    const video = projectVideo(p);
    if (!video) return [];
    return [
      {
        url: `${base}${video.path}`,
        lastModified: new Date(video.uploadDate),
        changeFrequency: "yearly" as const,
        priority: 0.6,
        videos: [
          {
            title: video.title,
            description: video.description,
            thumbnail_loc: `${base}${video.poster}`,
            content_loc: `${base}${video.src}`,
            duration: video.durationSeconds,
            publication_date: video.uploadDate,
            family_friendly: "yes" as const,
          },
        ],
      },
    ];
  });

  return [
    ...staticEntries,
    ...serviceEntries,
    ...locationEntries,
    ...postEntries,
    ...projectEntries,
    ...videoEntries,
  ];
}
