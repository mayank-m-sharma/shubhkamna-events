import type { ReactNode } from "react";

import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import type { StatsProps } from "@/types/stats";

import styles from "./Stats.module.scss";

const STATS_HEADING_ID = "stats-heading";

export function Stats({ heading, items }: StatsProps): ReactNode {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      className={styles.stats}
      aria-labelledby={heading ? STATS_HEADING_ID : undefined}
    >
      {heading ? (
        <Heading
          as="h2"
          size="lg"
          id={STATS_HEADING_ID}
          className={styles.heading}
        >
          {heading}
        </Heading>
      ) : null}
      <dl className={styles.grid}>
        {items.map((item) => (
          <div key={item.label} className={styles.item}>
            <dt className={styles.value}>{item.value}</dt>
            <dd>
              <Text muted className={styles.label}>
                {item.label}
              </Text>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
