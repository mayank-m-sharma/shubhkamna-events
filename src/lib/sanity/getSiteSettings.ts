import { cache } from "react";

import { sanityClient } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";
import {
  fallbackSiteSettings,
  siteSettingsSchema,
} from "@/lib/validations/siteSettings.schema";
import type { SiteSettings } from "@/types/siteSettings";

// Wrapped in React's `cache()` so layout + page can both call this during the
// same request without issuing the GROQ query to Sanity twice. Tagged
// "siteSettings" so the revalidate route (SHU-015) can target just this
// document on publish.
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const raw: unknown = await sanityClient.fetch(
    siteSettingsQuery,
    {},
    { next: { tags: ["siteSettings"] } },
  );
  const parsed = siteSettingsSchema.safeParse(raw);

  return parsed.success ? parsed.data : fallbackSiteSettings;
});
