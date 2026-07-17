import type { ReactNode } from "react";

import { Image } from "@/components/atoms/Image";
import type { SanityImage } from "@/lib/validations/image.schema";

import styles from "./Hero.module.scss";
import { HeroBackgroundVideo } from "./HeroBackgroundVideo";

interface HeroMediaProps {
  headline: string;
  backgroundImage?: SanityImage;
  backgroundImageAlt?: string;
  backgroundVideoUrl?: string;
  secondaryImage?: SanityImage;
  secondaryImageAlt?: string;
  badge?: ReactNode;
}

export function HeroMedia({
  headline,
  backgroundImage,
  backgroundImageAlt,
  backgroundVideoUrl,
  secondaryImage,
  secondaryImageAlt,
  badge,
}: HeroMediaProps): ReactNode {
  const showSecondaryImage = Boolean(!backgroundVideoUrl && secondaryImage);

  return (
    <div className={styles.mediaColumn}>
      <div className={styles.mediaWrapper}>
        {backgroundVideoUrl ? (
          <HeroBackgroundVideo
            src={backgroundVideoUrl}
            className={styles.media}
          />
        ) : backgroundImage ? (
          <Image
            image={backgroundImage}
            alt={backgroundImageAlt || headline}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className={styles.media}
          />
        ) : null}
      </div>
      {showSecondaryImage ? (
        <div className={styles.accentWrapper}>
          <Image
            image={secondaryImage!}
            alt={secondaryImageAlt || ""}
            fill
            sizes="(min-width: 768px) 180px, 35vw"
            className={styles.accentMedia}
          />
        </div>
      ) : null}
      {badge}
    </div>
  );
}
