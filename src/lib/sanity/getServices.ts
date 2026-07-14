import { cache } from "react";

import { sanityClient } from "@/lib/sanity/client";
import { servicesQuery } from "@/lib/sanity/queries";
import { serviceSchema } from "@/lib/validations/service.schema";
import type { Service } from "@/types/service";

// Invalid entries are dropped rather than failing the whole list, matching
// this project's graceful-degradation approach elsewhere (getHomePage,
// getSiteSettings).
export const getServices = cache(async (): Promise<Service[]> => {
  const raw: unknown = await sanityClient.fetch(
    servicesQuery,
    {},
    { next: { tags: ["service"] } },
  );

  if (!Array.isArray(raw)) {
    return [];
  }

  return raw
    .map((entry) => serviceSchema.safeParse(entry))
    .filter((parsed) => parsed.success)
    .map((parsed) => parsed.data);
});
