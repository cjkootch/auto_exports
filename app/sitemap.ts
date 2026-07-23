import type { MetadataRoute } from "next";
import { CATALOG } from "@/data/catalog";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vectorautoexports.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/catalog", "/logistics", "/contact"].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const categories = CATALOG.map((c) => ({
    url: `${siteUrl}/catalog/${c.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...routes, ...categories];
}
