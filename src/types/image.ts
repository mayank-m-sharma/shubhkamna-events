// Re-exported from the Zod schema (the source of truth) rather than
// hand-declared — see steering/typescript.md.
import type { SanityImage } from "@/lib/validations/image.schema";

export type { SanityImage };

interface BaseImageProps {
  image: SanityImage;
  // Required, not optional — enforces jsx-a11y/alt-text at the type level,
  // not just the lint level (see SHU-004's acceptance criteria).
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

export interface FillImageProps extends BaseImageProps {
  fill: true;
}

export interface FixedImageProps extends BaseImageProps {
  fill?: false;
}

export type ImageProps = FillImageProps | FixedImageProps;
