// Re-exported from the Zod schema (the source of truth) rather than
// hand-declared — see steering/typescript.md.
import type { GalleryImage } from "@/lib/validations/homePage.schema";
import type { SanityImage } from "@/lib/validations/image.schema";

export interface ServiceDetailProps {
  title: string;
  description: string;
  image: SanityImage;
  imageAlt: string;
  features: string[];
  gallery?: GalleryImage[];
  ctaLabel: string;
  ctaHref: string;
}
