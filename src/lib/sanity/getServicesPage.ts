import { cache } from "react";

import { sanityClient } from "@/lib/sanity/client";
import { servicesPageQuery } from "@/lib/sanity/queries";
import { servicesPageSchema } from "@/lib/validations/servicesPage.schema";
import type { ServicesPage } from "@/lib/validations/servicesPage.schema";

// `null` when unpublished/invalid — the route falls back to the previous
// hardcoded hero copy rather than 404ing, since /services (unlike
// /gallery or /contact) already has real content (the service cards
// themselves) even without this document.
export const getServicesPage = cache(async (): Promise<ServicesPage | null> => {
  const raw: unknown = await sanityClient.fetch(
    servicesPageQuery,
    {},
    { next: { tags: ["servicesPage"] } },
  );
  const parsed = servicesPageSchema.safeParse(raw);

  return parsed.success ? parsed.data : null;
});
