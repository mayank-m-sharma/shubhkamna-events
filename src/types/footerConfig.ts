// Re-exported from the Zod schema (the source of truth) rather than
// hand-declared — see steering/typescript.md.
import type {
  FooterColumn,
  FooterConfig,
} from "@/lib/validations/footerConfig.schema";
import type { SocialLink } from "@/types/siteSettings";

export type { FooterColumn, FooterConfig };

export interface FooterProps {
  columns: FooterColumn[];
  contactPhone?: string;
  contactEmail?: string;
  contactAddress?: string;
  socialLinks: SocialLink[];
  copyrightText?: string;
}
