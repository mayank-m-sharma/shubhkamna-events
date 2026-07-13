// Re-exported from the Zod schema (the source of truth) rather than
// hand-declared — see steering/typescript.md.
import type {
  GalleryImage,
  GallerySection,
} from "@/lib/validations/homePage.schema";

export type { GalleryImage, GallerySection };

export interface GalleryProps {
  heading?: string;
  intro?: string;
  viewAllLabel?: string;
  viewAllHref?: string;
  images: GalleryImage[];
}
