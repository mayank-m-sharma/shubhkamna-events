import type { ReactNode } from "react";

import { Heading } from "@/components/atoms/Heading";
import { Image } from "@/components/atoms/Image";
import { Text } from "@/components/atoms/Text";
import { cn } from "@/lib/utils/cn";
import type { ContactHeroProps } from "@/types/contactHero";

import styles from "./ContactHero.module.scss";

const CONTACT_HERO_HEADING_ID = "contact-hero-headline";

export function ContactHero({
  heading,
  subhead,
  backgroundImage,
}: ContactHeroProps): ReactNode {
  return (
    <section className={styles.hero} aria-labelledby={CONTACT_HERO_HEADING_ID}>
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
        <Heading as="h1" size="xl" id={CONTACT_HERO_HEADING_ID}>
          {heading}
        </Heading>
        {subhead ? <Text className={styles.subhead}>{subhead}</Text> : null}
      </div>
    </section>
  );
}
