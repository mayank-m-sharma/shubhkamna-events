// Re-exported from the Zod schema (the source of truth) rather than
// hand-declared — see steering/typescript.md.
import type {
  HeaderConfig,
  NavItem,
} from "@/lib/validations/headerConfig.schema";
import type { SanityImage } from "@/types/image";

export type { HeaderConfig, NavItem };

export interface HeaderProps {
  siteName: string;
  logo?: SanityImage;
  navItems: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
}
