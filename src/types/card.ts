import type { SanityImage } from "@/types/image";

interface BaseCardProps {
  heading: string;
  text?: string;
  href?: string;
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
