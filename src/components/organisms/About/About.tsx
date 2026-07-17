import type { ReactNode } from "react";

import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Image } from "@/components/atoms/Image";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import type { AboutProps } from "@/types/about";

import styles from "./About.module.scss";

const ABOUT_HEADING_ID = "about-heading";

export function About({
  eyebrow,
  heading,
  bodyFirst,
  bodySecond,
  checklist,
  ctaLabel,
  ctaHref,
  imageFirst,
  imageFirstAlt,
  imageSecond,
  imageSecondAlt,
}: AboutProps): ReactNode {
  const showCta = Boolean(ctaLabel && ctaHref);

  return (
    <section className={styles.about} aria-labelledby={ABOUT_HEADING_ID}>
      <div className={styles.images}>
        <div className={styles.imagePrimary}>
          <Image
            image={imageFirst}
            alt={imageFirstAlt}
            fill
            sizes="(min-width: 768px) 35vw, 90vw"
            className={styles.media}
          />
        </div>
        {imageSecond ? (
          <div className={styles.imageSecondary}>
            <Image
              image={imageSecond}
              alt={imageSecondAlt || ""}
              fill
              sizes="(min-width: 768px) 30vw, 70vw"
              className={styles.media}
            />
          </div>
        ) : null}
      </div>
      <div className={styles.content}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <Heading as="h2" size="xl" id={ABOUT_HEADING_ID}>
          {heading}
        </Heading>
        <Text className={styles.body}>{bodyFirst}</Text>
        {bodySecond ? <Text className={styles.body}>{bodySecond}</Text> : null}
        {checklist.length > 0 ? (
          <ul className={styles.checklist}>
            {checklist.map((item) => (
              <li key={item} className={styles.checklistItem}>
                <span className={styles.checkIcon}>
                  <Icon name="check" size="sm" />
                </span>
                <Text className={styles.checklistText}>{item}</Text>
              </li>
            ))}
          </ul>
        ) : null}
        {showCta ? (
          <Link href={ctaHref as string} className={styles.cta}>
            {ctaLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
