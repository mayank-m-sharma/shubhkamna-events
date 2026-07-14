import { cache } from "react";

import { sanityClient } from "@/lib/sanity/client";
import { serviceBySlugQuery } from "@/lib/sanity/queries";
import { serviceSchema } from "@/lib/validations/service.schema";
import type { Service } from "@/types/service";

// `null` on an invalid/missing slug so the route can call notFound() —
// same graceful-degradation shape as getHomePage, not a thrown error.
export const getServiceBySlug = cache(
  async (slug: string): Promise<Service | null> => {
    const raw: unknown = await sanityClient.fetch(
      serviceBySlugQuery,
      { slug },
      { next: { tags: ["service"] } },
    );
    const parsed = serviceSchema.safeParse(raw);

    return parsed.success ? parsed.data : null;
  },
);
