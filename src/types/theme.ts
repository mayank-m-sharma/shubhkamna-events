import type { ReactNode } from "react";

// Re-exported from the Zod schema (the source of truth) rather than
// hand-declared — see steering/typescript.md.
import type {
  BodyFontKey,
  HeadingFontKey,
  SiteTheme,
} from "@/lib/validations/theme.schema";

export type { BodyFontKey, HeadingFontKey, SiteTheme };

export interface ThemeContextProviderProps {
  theme: SiteTheme;
  children: ReactNode;
}

export interface ThemeProviderProps {
  children: ReactNode;
}
