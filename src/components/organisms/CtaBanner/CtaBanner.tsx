import type { ReactNode } from "react";

import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import type { CtaBannerProps } from "@/types/ctaBanner";

import styles from "./CtaBanner.module.scss";

const CTA_BANNER_HEADING_ID = "cta-banner-heading";

export function CtaBanner({
  heading,
  body,
  phone,
  secondaryLabel,
  secondaryHref,
}: CtaBannerProps): ReactNode {
  const showSecondary = Boolean(secondaryLabel && secondaryHref);

  return (
    <section className={styles.banner} aria-labelledby={CTA_BANNER_HEADING_ID}>
      <Heading as="h2" size="lg" id={CTA_BANNER_HEADING_ID}>
        {heading}
      </Heading>
      {body ? <Text className={styles.body}>{body}</Text> : null}
      <div className={styles.actions}>
        {phone ? (
          <Link href={`tel:${phone}`} className={styles.primaryCta}>
            <Icon name="phone" size="sm" />
            {phone}
          </Link>
        ) : null}
        {showSecondary ? (
          <Link href={secondaryHref as string} className={styles.secondaryCta}>
            {secondaryLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
