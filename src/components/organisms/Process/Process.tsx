import type { ReactNode } from "react";

import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import type { ProcessProps } from "@/types/process";

import styles from "./Process.module.scss";

const PROCESS_HEADING_ID = "process-heading";

export function Process({ eyebrow, heading, steps }: ProcessProps): ReactNode {
  if (steps.length === 0) {
    return null;
  }

  return (
    <section
      className={styles.process}
      aria-labelledby={heading ? PROCESS_HEADING_ID : undefined}
    >
      <div className={styles.card}>
        <div className={styles.header}>
          {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
          {heading ? (
            <Heading as="h2" size="lg" id={PROCESS_HEADING_ID}>
              {heading}
            </Heading>
          ) : null}
        </div>
        <ol className={styles.steps}>
          {steps.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.iconWrapper}>
                <Icon name={step.icon} size="lg" />
              </span>
              {/* Decorative — the <ol> already conveys step order to
                  assistive tech; this just mirrors the reference's visual
                  numbering without double-announcing it. */}
              <span className={styles.stepNumber} aria-hidden="true">
                {index + 1}
              </span>
              <Heading as="h3" size="md" className={styles.stepTitle}>
                {step.title}
              </Heading>
              <Text muted className={styles.stepDescription}>
                {step.description}
              </Text>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
