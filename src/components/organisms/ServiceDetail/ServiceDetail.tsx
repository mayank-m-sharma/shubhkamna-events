import type { ReactNode } from "react";

import { Button } from "@/components/atoms/Button";
import { Heading } from "@/components/atoms/Heading";
import { Image } from "@/components/atoms/Image";
import { Text } from "@/components/atoms/Text";
import { Gallery } from "@/components/organisms/Gallery";
import type { ServiceDetailProps } from "@/types/serviceDetail";

import styles from "./ServiceDetail.module.scss";

const SERVICE_DETAIL_HEADING_ID = "service-detail-heading";

export function ServiceDetail({
  title,
  description,
  image,
  imageAlt,
  features,
  gallery,
  ctaLabel,
  ctaHref,
}: ServiceDetailProps): ReactNode {
  return (
    <article
      className={styles.serviceDetail}
      aria-labelledby={SERVICE_DETAIL_HEADING_ID}
    >
      <div className={styles.header}>
        <div className={styles.content}>
          <Heading as="h1" size="xl" id={SERVICE_DETAIL_HEADING_ID}>
            {title}
          </Heading>
          <Text className={styles.description}>{description}</Text>
          <ul className={styles.features} aria-label="Features">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <Button href={ctaHref} variant="primary">
            {ctaLabel}
          </Button>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            image={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className={styles.image}
          />
        </div>
      </div>
      {gallery && gallery.length > 0 ? <Gallery images={gallery} /> : null}
    </article>
  );
}
