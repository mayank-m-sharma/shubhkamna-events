import type { SanityImage } from "@/lib/validations/image.schema";

export interface ContactHeroProps {
  heading: string;
  subhead?: string;
  backgroundImage?: SanityImage;
}
