import type { ReactNode } from "react";

import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { ContactForm } from "@/components/organisms/ContactForm";
import type { ContactSectionProps } from "@/types/contactSection";

import styles from "./ContactSection.module.scss";

const CONTACT_HEADING_ID = "contact-heading";

export function ContactSection({
  variant,
  heading,
  intro,
  successMessage,
  phone,
  whatsappNumber,
}: ContactSectionProps): ReactNode {
  return (
    <section
      className={styles.contact}
      aria-labelledby={heading ? CONTACT_HEADING_ID : undefined}
    >
      {heading ? (
        <Heading as="h2" size="lg" id={CONTACT_HEADING_ID}>
          {heading}
        </Heading>
      ) : null}
      {intro ? <Text className={styles.intro}>{intro}</Text> : null}
      {variant === "banner" ? (
        <div className={styles.ctaRow}>
          {phone ? (
            <Link href={`tel:${phone}`} className={styles.cta}>
              <Icon name="phone" size="sm" />
              {phone}
            </Link>
          ) : null}
          {whatsappNumber ? (
            <Link
              href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
              className={styles.cta}
            >
              WhatsApp Us
            </Link>
          ) : null}
        </div>
      ) : (
        <ContactForm successMessage={successMessage} />
      )}
    </section>
  );
}
