import { cache } from "react";

import { sanityClient } from "@/lib/sanity/client";
import { footerConfigQuery } from "@/lib/sanity/queries";
import {
  fallbackFooterConfig,
  footerConfigSchema,
} from "@/lib/validations/footerConfig.schema";
import type { FooterConfig } from "@/types/footerConfig";

// Wrapped in React's `cache()` so layout + page can both call this during the
// same request without issuing the GROQ query to Sanity twice.
export const getFooterConfig = cache(async (): Promise<FooterConfig> => {
  const raw: unknown = await sanityClient.fetch(footerConfigQuery);
  const parsed = footerConfigSchema.safeParse(raw);

  return parsed.success ? parsed.data : fallbackFooterConfig;
});
