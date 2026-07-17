// Re-exported from the Zod schema (the source of truth) rather than
// hand-declared — see steering/typescript.md.
import type { HeroSection } from "@/lib/validations/homePage.schema";
import type { SanityImage } from "@/types/image";

export type { HeroSection };

export interface HeroProps {
  headline: string;
  headlineHighlight?: string;
  subhead?: string;
  backgroundImage?: SanityImage;
  backgroundImageAlt?: string;
  backgroundVideoUrl?: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  secondaryImage?: SanityImage;
  secondaryImageAlt?: string;
  // Sourced from siteSettings (SHU-003), not heroSection itself — the
  // trust badge is omitted entirely when either is unset.
  reviewRating?: number;
  reviewCount?: number;
}
