import type { ReactNode } from "react";

import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Image } from "@/components/atoms/Image";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import type { ServiceCardProps } from "@/types/serviceCard";

import styles from "./ServiceCard.module.scss";

export function ServiceCard({
  title,
  description,
  image,
  imageAlt,
  icon,
  features,
  ctaLabel,
  ctaHref,
  detailHref,
  priority,
}: ServiceCardProps): ReactNode {
  return (
    <article className={styles.card}>
      <Link href={detailHref} className={styles.mediaLink}>
        <div className={styles.imageWrapper}>
          <Image
            image={image}
            alt={imageAlt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={styles.media}
          />
          <div className={styles.overlay} aria-hidden="true" />
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>
              <Icon name={icon} size="sm" />
            </span>
            <Heading as="h3" size="md" className={styles.badgeTitle}>
              {title}
            </Heading>
          </div>
        </div>
      </Link>
      <div className={styles.body}>
        <Text className={styles.description}>{description}</Text>
        <ul className={styles.features}>
          {features.map((feature) => (
            <li key={feature} className={styles.feature}>
              <span className={styles.checkIcon}>
                <Icon name="check" size="sm" />
              </span>
              <Text className={styles.featureText}>{feature}</Text>
            </li>
          ))}
        </ul>
        <Link href={ctaHref} className={styles.cta}>
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}
