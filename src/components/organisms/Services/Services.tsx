import type { ReactNode } from "react";

import { Heading } from "@/components/atoms/Heading";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { Card } from "@/components/molecules/Card";
import type { ServicesProps } from "@/types/services";

import styles from "./Services.module.scss";

export function Services({
  heading,
  intro,
  viewAllLabel,
  viewAllHref,
  items,
}: ServicesProps): ReactNode {
  const showViewAllLink = Boolean(viewAllLabel && viewAllHref);

  return (
    <section
      className={styles.services}
      aria-labelledby={heading ? "services-heading" : undefined}
    >
      <div className={styles.header}>
        <div>
          {heading ? (
            <Heading as="h2" size="lg" id="services-heading">
              {heading}
            </Heading>
          ) : null}
          {intro ? <Text className={styles.intro}>{intro}</Text> : null}
        </div>
        {showViewAllLink ? (
          <Link href={viewAllHref as string}>{viewAllLabel}</Link>
        ) : null}
      </div>
      {items.length > 0 ? (
        <div className={styles.grid}>
          {items.map((item) => (
            <Card
              key={item.title}
              icon={item.icon}
              heading={item.title}
              text={item.description}
              href={item.href}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
