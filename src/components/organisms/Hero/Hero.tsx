import type { ReactNode } from "react";

import { Button } from "@/components/atoms/Button";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import type { HeroProps } from "@/types/hero";

import styles from "./Hero.module.scss";
import { HeroMedia } from "./HeroMedia";

const HERO_HEADLINE_ID = "hero-headline";

// Splits off the CMS-controlled trailing substring to highlight (e.g.
// "Our Magic." within "Your Vision, Our Magic.") rather than guessing
// which word(s) to emphasize in code — see heroSectionSchema's
// `headlineHighlight` field.
function splitHeadline(
  headline: string,
  highlight?: string,
): { rest: string; highlight?: string } {
  if (highlight && headline.endsWith(highlight)) {
    return {
      rest: headline.slice(0, headline.length - highlight.length),
      highlight,
    };
  }
  return { rest: headline, highlight: undefined };
}

export function Hero({
  headline,
  headlineHighlight,
  subhead,
  backgroundImage,
  backgroundImageAlt,
  backgroundVideoUrl,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  secondaryImage,
  secondaryImageAlt,
  reviewRating,
  reviewCount,
}: HeroProps): ReactNode {
  const hasMedia = Boolean(backgroundVideoUrl ?? backgroundImage);
  const showSecondaryCta = Boolean(secondaryCtaLabel && secondaryCtaHref);
  const showTrustBadge = Boolean(reviewRating && reviewCount);
  const { rest, highlight } = splitHeadline(headline, headlineHighlight);

  const badge = showTrustBadge ? (
    <div className={styles.badge}>
      <Icon name="star" size="sm" />
      <Text size="base" className={styles.badgeText}>
        {reviewRating} ★ Google Rating | {reviewCount}+ Reviews
      </Text>
    </div>
  ) : null;

  return (
    <section className={styles.hero} aria-labelledby={HERO_HEADLINE_ID}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.content}>
        <Heading as="h1" size="xl" id={HERO_HEADLINE_ID}>
          {rest}
          {highlight ? (
            <span className={styles.highlight}>{highlight}</span>
          ) : null}
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
        {!hasMedia ? badge : null}
      </div>
      {hasMedia ? (
        <HeroMedia
          headline={headline}
          backgroundImage={backgroundImage}
          backgroundImageAlt={backgroundImageAlt}
          backgroundVideoUrl={backgroundVideoUrl}
          secondaryImage={secondaryImage}
          secondaryImageAlt={secondaryImageAlt}
          badge={badge}
        />
      ) : null}
    </section>
  );
}
