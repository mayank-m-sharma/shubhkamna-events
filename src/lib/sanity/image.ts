import {
  createImageUrlBuilder,
  type ImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

import { sanityClient } from "@/lib/sanity/client";

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource): ImageUrlBuilder {
  return builder.image(source);
}
