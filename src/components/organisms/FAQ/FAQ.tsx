"use client";

import { useState, type ReactNode } from "react";

import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { cn } from "@/lib/utils/cn";
import type { FAQProps } from "@/types/faq";

import styles from "./FAQ.module.scss";

const FAQ_HEADING_ID = "faq-heading";

function slugify(question: string, index: number): string {
  return `faq-${index}-${question.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

export function FAQ({ heading, intro, items }: FAQProps): ReactNode {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  function toggle(id: string): void {
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      className={styles.faq}
      aria-labelledby={heading ? FAQ_HEADING_ID : undefined}
    >
      {heading ? (
        <Heading as="h2" size="lg" id={FAQ_HEADING_ID}>
          {heading}
        </Heading>
      ) : null}
      {intro ? <Text className={styles.intro}>{intro}</Text> : null}
      <div className={styles.list}>
        {items.map((item, index) => {
          const id = slugify(item.question, index);
          const questionId = `${id}-question`;
          const answerId = `${id}-answer`;
          const isOpen = openIds.has(id);

          return (
            <div key={id} className={styles.item}>
              <button
                type="button"
                id={questionId}
                className={styles.question}
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => toggle(id)}
              >
                <span>{item.question}</span>
                <Icon
                  name="chevron-down"
                  className={cn(styles.chevron, isOpen && styles.open)}
                />
              </button>
              <div
                id={answerId}
                role="region"
                aria-labelledby={questionId}
                hidden={!isOpen}
                className={styles.answer}
              >
                <Text>{item.answer}</Text>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
