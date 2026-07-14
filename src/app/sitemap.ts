import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/sanity/env";
import { getServiceSlugs } from "@/lib/sanity/getServiceSlugs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getServiceSlugs();

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/services", siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...slugs.map((slug) => ({
      url: new URL(`/services/${slug}`, siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
