import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/sanity/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/studio",
      },
    ],
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
