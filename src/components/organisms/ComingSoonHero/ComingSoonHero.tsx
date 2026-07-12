import type { ReactNode } from "react";

import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";

import styles from "./ComingSoonHero.module.scss";

interface ComingSoonHeroProps {
  tagline: string;
  headline: string;
  message: string;
}

export function ComingSoonHero({
  tagline,
  headline,
  message,
}: ComingSoonHeroProps): ReactNode {
  return (
    <section className={styles.hero} aria-labelledby="coming-soon-headline">
      <Text size="md" muted className={styles.tagline}>
        {tagline}
      </Text>
      <Heading as="h1" size="xl" id="coming-soon-headline">
        {headline}
      </Heading>
      <Text className={styles.message}>{message}</Text>
    </section>
  );
}
