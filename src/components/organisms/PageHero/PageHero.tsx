import type { ReactNode } from "react";

import { Heading } from "@/components/atoms/Heading";
import { Image } from "@/components/atoms/Image";
import { Text } from "@/components/atoms/Text";
import { cn } from "@/lib/utils/cn";
import { splitHeadline } from "@/lib/utils/splitHeadline";
import type { PageHeroProps } from "@/types/pageHero";

import styles from "./PageHero.module.scss";

const PAGE_HERO_HEADING_ID = "page-hero-headline";

export function PageHero({
  eyebrow,
  heading,
  headlineHighlight,
  subhead,
  backgroundImage,
}: PageHeroProps): ReactNode {
  const { rest, highlight } = splitHeadline(heading, headlineHighlight);

  return (
    <section className={styles.hero} aria-labelledby={PAGE_HERO_HEADING_ID}>
      {backgroundImage ? (
        <div className={styles.mediaWrapper}>
          <Image
            image={backgroundImage}
            alt={heading}
            fill
            priority
            sizes="100vw"
            className={styles.media}
          />
          <div className={styles.overlay} />
        </div>
      ) : null}
      <div className={cn(styles.content, backgroundImage && styles.withImage)}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <Heading as="h1" size="xl" id={PAGE_HERO_HEADING_ID}>
          {rest}
          {highlight ? (
            <span className={styles.highlight}>{highlight}</span>
          ) : null}
        </Heading>
        {subhead ? <Text className={styles.subhead}>{subhead}</Text> : null}
      </div>
    </section>
  );
}
