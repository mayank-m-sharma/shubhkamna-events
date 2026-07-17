// Re-exported from the Zod schema (the source of truth) rather than
// hand-declared — see steering/typescript.md.
import type { AboutSection } from "@/lib/validations/homePage.schema";
import type { SanityImage } from "@/types/image";

export type { AboutSection };

export interface AboutProps {
  eyebrow?: string;
  heading: string;
  bodyFirst: string;
  bodySecond?: string;
  checklist: string[];
  ctaLabel?: string;
  ctaHref?: string;
  imageFirst: SanityImage;
  imageFirstAlt: string;
  imageSecond?: SanityImage;
  imageSecondAlt?: string;
}
