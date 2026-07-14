import { cache } from "react";

import { sanityClient } from "@/lib/sanity/client";
import { serviceSlugsQuery } from "@/lib/sanity/queries";
import { serviceSlugsSchema } from "@/lib/validations/service.schema";

// Shared by generateStaticParams (route) and sitemap.ts. Invalid entries are
// dropped rather than failing the whole list, matching this project's
// graceful-degradation approach elsewhere (getHomePage, getSiteSettings).
export const getServiceSlugs = cache(async (): Promise<string[]> => {
  const raw: unknown = await sanityClient.fetch(
    serviceSlugsQuery,
    {},
    { next: { tags: ["service"] } },
  );
  const parsed = serviceSlugsSchema.safeParse(raw);

  return parsed.success ? parsed.data.map((entry) => entry.slug) : [];
});
