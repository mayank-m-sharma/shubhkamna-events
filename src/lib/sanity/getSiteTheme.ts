import { cache } from "react";

import { sanityClient } from "@/lib/sanity/client";
import { siteThemeQuery } from "@/lib/sanity/queries";
import {
  fallbackSiteTheme,
  siteThemeSchema,
} from "@/lib/validations/theme.schema";
import type { SiteTheme } from "@/types/theme";

// Wrapped in React's `cache()` so every caller in the same request (layout,
// ThemeProvider) shares one GROQ query instead of issuing it per caller.
export const getSiteTheme = cache(async (): Promise<SiteTheme> => {
  const raw: unknown = await sanityClient.fetch(siteThemeQuery);
  const parsed = siteThemeSchema.safeParse(raw);

  return parsed.success ? parsed.data : fallbackSiteTheme;
});
