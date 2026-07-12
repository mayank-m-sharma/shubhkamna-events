import { cache } from "react";

import { sanityClient } from "@/lib/sanity/client";
import { headerConfigQuery } from "@/lib/sanity/queries";
import {
  fallbackHeaderConfig,
  headerConfigSchema,
} from "@/lib/validations/headerConfig.schema";
import type { HeaderConfig } from "@/types/headerConfig";

// Wrapped in React's `cache()` so layout + page can both call this during the
// same request without issuing the GROQ query to Sanity twice.
export const getHeaderConfig = cache(async (): Promise<HeaderConfig> => {
  const raw: unknown = await sanityClient.fetch(headerConfigQuery);
  const parsed = headerConfigSchema.safeParse(raw);

  return parsed.success ? parsed.data : fallbackHeaderConfig;
});
