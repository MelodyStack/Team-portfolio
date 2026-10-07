import type { MetadataRoute } from "next";
import { brand } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = brand.url.replace(/\/$/, "");

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
