import type { SanityImage } from "@/lib/validations/image.schema";

export interface PageHeroProps {
  eyebrow?: string;
  heading: string;
  headlineHighlight?: string;
  subhead?: string;
  backgroundImage?: SanityImage;
}
