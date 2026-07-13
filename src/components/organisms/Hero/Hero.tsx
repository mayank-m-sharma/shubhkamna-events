import type { ReactNode } from "react";

import { Button } from "@/components/atoms/Button";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Image } from "@/components/atoms/Image";
import { Text } from "@/components/atoms/Text";
import type { HeroProps } from "@/types/hero";

import styles from "./Hero.module.scss";
import { HeroBackgroundVideo } from "./HeroBackgroundVideo";

const HERO_HEADLINE_ID = "hero-headline";

export function Hero({
  headline,
  subhead,
  backgroundImage,
  backgroundImageAlt,
  backgroundVideoUrl,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  reviewRating,
  reviewCount,
}: HeroProps): ReactNode {
  const hasMedia = Boolean(backgroundVideoUrl ?? backgroundImage);
  const showSecondaryCta = Boolean(secondaryCtaLabel && secondaryCtaHref);
  const showTrustBadge = Boolean(reviewRating && reviewCount);

  return (
    <section className={styles.hero} aria-labelledby={HERO_HEADLINE_ID}>
      <div className={styles.content}>
        <Heading as="h1" size="xl" id={HERO_HEADLINE_ID}>
          {headline}
        </Heading>
        {subhead ? <Text className={styles.subhead}>{subhead}</Text> : null}
        <div className={styles.ctaRow}>
          <Button href={primaryCtaHref} variant="primary">
            {primaryCtaLabel}
          </Button>
          {showSecondaryCta ? (
            <Button href={secondaryCtaHref as string} variant="ghost">
              {secondaryCtaLabel}
            </Button>
          ) : null}
        </div>
      </div>
      {hasMedia ? (
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
      ) : null}
      {showTrustBadge ? (
        <div className={styles.badge}>
          <Icon name="star" size="sm" />
          <Text size="base" className={styles.badgeText}>
            {reviewRating} ★ Google Rating | {reviewCount}+ Reviews
          </Text>
        </div>
      ) : null}
    </section>
  );
}
