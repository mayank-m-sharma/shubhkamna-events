import NextImage from "next/image";
import type { ReactNode } from "react";

import { urlFor } from "@/lib/sanity/image";
import type { ImageProps } from "@/types/image";

export function Image({
  image,
  alt,
  sizes,
  priority,
  fill,
  className,
}: ImageProps): ReactNode {
  const src = urlFor(image).auto("format").url();

  if (fill) {
    return (
      <NextImage
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
      />
    );
  }

  const { width, height } = image.asset.metadata.dimensions;

  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
