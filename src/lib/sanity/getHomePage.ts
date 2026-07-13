import { cache } from "react";

import { sanityClient } from "@/lib/sanity/client";
import { homePageQuery } from "@/lib/sanity/queries";
import { homePageSchema } from "@/lib/validations/homePage.schema";
import type { HomePage } from "@/types/cms";

// No fallback constant (unlike siteSettings/headerConfig/footerConfig) —
// there's no sensible synthetic set of homepage sections to invent. `null`
// signals the page-builder renderer (SHU-015) to fall back to the
// coming-soon placeholder instead.
export const getHomePage = cache(async (): Promise<HomePage | null> => {
  const raw: unknown = await sanityClient.fetch(
    homePageQuery,
    {},
    { next: { tags: ["homePage"] } },
  );
  const parsed = homePageSchema.safeParse(raw);

  return parsed.success ? parsed.data : null;
});
