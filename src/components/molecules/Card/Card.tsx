import type { ReactNode } from "react";

import { Heading } from "@/components/atoms/Heading";
import { Image } from "@/components/atoms/Image";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { cn } from "@/lib/utils/cn";
import type { CardProps } from "@/types/card";

import styles from "./Card.module.scss";

export function Card({
  image,
  imageAlt,
  heading,
  text,
  href,
  className,
}: CardProps): ReactNode {
  const content = (
    <>
      {image ? (
        <Image
          image={image}
          alt={imageAlt}
          sizes="(min-width: 768px) 33vw, 100vw"
          className={styles.image}
        />
      ) : null}
      <Heading as="h3" size="md">
        {heading}
      </Heading>
      {text ? <Text className={styles.text}>{text}</Text> : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(styles.card, className)}>
        {content}
      </Link>
    );
  }

  return <article className={cn(styles.card, className)}>{content}</article>;
}
