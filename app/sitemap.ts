import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllLocations } from "@/lib/locations";
import { getAllProjects } from "@/lib/portfolio";
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
    lastModified: new Date(p.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const projectEntries = projects.map((p) => ({
    url: `${base}/portfolio/${p.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [
    ...staticEntries,
    ...serviceEntries,
    ...locationEntries,
    ...postEntries,
    ...projectEntries,
  ];
}
