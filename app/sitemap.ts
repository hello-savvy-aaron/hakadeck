import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllProjects } from "@/lib/portfolio";
import { getAllServices } from "@/lib/services";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();

  const staticPaths = ["", "/about", "/services", "/portfolio", "/blog", "/contact"];
  const staticEntries = staticPaths.map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const [posts, projects, services] = await Promise.all([
    getAllPosts(),
    getAllProjects(),
    getAllServices(),
  ]);

  const serviceEntries = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
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

  return [...staticEntries, ...serviceEntries, ...postEntries, ...projectEntries];
}
