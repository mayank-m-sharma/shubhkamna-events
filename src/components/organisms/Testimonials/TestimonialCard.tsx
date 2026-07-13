import type { ReactNode } from "react";

import { Icon } from "@/components/atoms/Icon";
import { Image } from "@/components/atoms/Image";
import { Text } from "@/components/atoms/Text";
import type { TestimonialItem } from "@/types/testimonials";

import styles from "./Testimonials.module.scss";

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

interface TestimonialCardProps {
  item: TestimonialItem;
  avatarVariant: "primary" | "accent";
}

export function TestimonialCard({
  item,
  avatarVariant,
}: TestimonialCardProps): ReactNode {
  const { quote, author, role, photo, rating } = item;

  return (
    <article className={styles.card}>
      {rating ? (
        <div
          className={styles.stars}
          role="img"
          aria-label={`${rating} out of 5 stars`}
        >
          {Array.from({ length: rating }, (_, index) => (
            <Icon key={index} name="star" size="sm" />
          ))}
        </div>
      ) : null}
      <blockquote className={styles.quote}>{quote}</blockquote>
      <div className={styles.attribution}>
        {photo ? (
          <Image
            image={photo}
            alt={author}
            className={styles.avatarImage}
            sizes="48px"
          />
        ) : (
          <span
            className={`${styles.avatar} ${styles[avatarVariant]}`}
            aria-hidden="true"
          >
            {getInitials(author)}
          </span>
        )}
        <div>
          <Text className={styles.author}>{author}</Text>
          {role ? (
            <Text size="base" muted>
              {role}
            </Text>
          ) : null}
        </div>
      </div>
    </article>
  );
}
