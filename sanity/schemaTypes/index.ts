import type { SchemaTypeDefinition } from "sanity";

import { siteSettings } from "./siteSettings";
import { siteTheme } from "./siteTheme";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, siteTheme],
};
