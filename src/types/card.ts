import type { IconName } from "@/types/icon";
import type { SanityImage } from "@/types/image";

interface BaseCardProps {
  heading: string;
  text?: string;
  href?: string;
  // Rendered in place of `image` when no image is given (e.g. the Services
  // section's icon cards, SHU-011) — ignored if `image` is also present.
  icon?: IconName;
  className?: string;
}

interface CardWithImageProps extends BaseCardProps {
  image: SanityImage;
  imageAlt: string;
}

interface CardWithoutImageProps extends BaseCardProps {
  image?: undefined;
  imageAlt?: undefined;
}

export type CardProps = CardWithImageProps | CardWithoutImageProps;
