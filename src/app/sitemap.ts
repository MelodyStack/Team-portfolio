import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { brand } from "@/lib/site";

/**
 * Generated from the same data the pages are, so a new case study appears in
 * the sitemap without anyone remembering to add it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = brand.url.replace(/\/$/, "");

  const pages: Array<[string, number, MetadataRoute.Sitemap[number]["changeFrequency"]]> = [
    ["", 1, "weekly"],
    ["/work", 0.9, "weekly"],
    ["/services", 0.8, "monthly"],
    ["/process", 0.7, "monthly"],
    ["/team", 0.7, "monthly"],
    ["/contact", 0.8, "monthly"],
  ];

  return [
    ...pages.map(([path, priority, changeFrequency]) => ({
      url: `${base}${path}`,
      priority,
      changeFrequency,
    })),
    ...projects.map((project) => ({
      url: `${base}/work/${project.slug}`,
      priority: 0.6,
      changeFrequency: "yearly" as const,
    })),
  ];
}
