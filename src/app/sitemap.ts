import type { MetadataRoute } from "next";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    ["", "weekly", 1],
    ["/services", "monthly", 0.9],
    ["/for-sponsors", "monthly", 0.9],
    ["/for-sites", "monthly", 0.9],
    ["/about", "monthly", 0.7],
    ["/contact", "monthly", 0.8],
  ] as const;

  return pages.map(([path, changeFrequency, priority]) => ({
    url: path ? new URL(path, siteUrl).toString() : siteUrl,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
