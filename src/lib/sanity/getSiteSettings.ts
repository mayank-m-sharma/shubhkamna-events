import { cache } from "react";

import { sanityClient } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";
import {
  fallbackSiteSettings,
  siteSettingsSchema,
  type SiteSettings,
} from "@/lib/validations/siteSettings.schema";

// Wrapped in React's `cache()` so layout + page can both call this during the
// same request without issuing the GROQ query to Sanity twice.
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const raw: unknown = await sanityClient.fetch(siteSettingsQuery);
  const parsed = siteSettingsSchema.safeParse(raw);

  return parsed.success ? parsed.data : fallbackSiteSettings;
});
