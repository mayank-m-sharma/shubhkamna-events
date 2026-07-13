import type { ReactNode } from "react";

import { Heading } from "@/components/atoms/Heading";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import type { TestimonialsProps } from "@/types/testimonials";

import { TestimonialCard } from "./TestimonialCard";
import styles from "./Testimonials.module.scss";

const TESTIMONIALS_HEADING_ID = "testimonials-heading";

export function Testimonials({
  heading,
  intro,
  items,
  reviewUrl,
  reviewCount,
}: TestimonialsProps): ReactNode {
  const showReviewsLink = Boolean(reviewUrl && reviewCount);

  return (
    <section
      className={styles.testimonials}
      aria-labelledby={heading ? TESTIMONIALS_HEADING_ID : undefined}
    >
      <div className={styles.header}>
        {heading ? (
          <Heading as="h2" size="lg" id={TESTIMONIALS_HEADING_ID}>
            {heading}
          </Heading>
        ) : null}
        {intro ? <Text className={styles.intro}>{intro}</Text> : null}
        {showReviewsLink ? (
          <Link href={reviewUrl as string}>Read {reviewCount}+ Reviews</Link>
        ) : null}
      </div>
      {items.length > 0 ? (
        <div className={styles.grid}>
          {items.map((item, index) => (
            <TestimonialCard
              key={item.author}
              item={item}
              avatarVariant={index % 2 === 0 ? "primary" : "accent"}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
