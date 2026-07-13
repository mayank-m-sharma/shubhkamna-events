import type { SchemaTypeDefinition } from "sanity";

import { footerConfig } from "./footerConfig";
import { headerConfig } from "./headerConfig";
import { siteSettings } from "./siteSettings";
import { siteTheme } from "./siteTheme";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, siteTheme, headerConfig, footerConfig],
};
