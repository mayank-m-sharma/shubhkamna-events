import type { ReactNode } from "react";

import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { Card } from "@/components/molecules/Card";
import { buildWhatsAppUrl } from "@/lib/utils/whatsapp";
import type { ContactInfoPanelProps } from "@/types/contactInfoPanel";

import styles from "./ContactInfoPanel.module.scss";

const CONTACT_INFO_HEADING_ID = "contact-info-heading";

export function ContactInfoPanel({
  intro,
  whatsappNumber,
  phone,
  officeAddress,
  areasServed,
}: ContactInfoPanelProps): ReactNode {
  return (
    <section className={styles.panel} aria-labelledby={CONTACT_INFO_HEADING_ID}>
      <Heading as="h2" size="lg" id={CONTACT_INFO_HEADING_ID}>
        Reach Out Directly
      </Heading>
      {intro ? <Text className={styles.intro}>{intro}</Text> : null}
      <div className={styles.cards}>
        {whatsappNumber ? (
          <Card
            icon="whatsapp"
            heading="WhatsApp Chat"
            text={whatsappNumber}
            href={buildWhatsAppUrl(whatsappNumber)}
          />
        ) : null}
        {phone ? (
          <Card
            icon="phone"
            heading="Call Us Anytime"
            text={phone}
            href={`tel:${phone}`}
          />
        ) : null}
      </div>
      {officeAddress ? (
        <div className={styles.office}>
          <Heading as="h3" size="md">
            Registered Office
          </Heading>
          <Text>{officeAddress}</Text>
        </div>
      ) : null}
      {areasServed.length > 0 ? (
        <div className={styles.areas}>
          <Heading as="h3" size="md">
            Areas We Serve
          </Heading>
          <ul className={styles.tagList}>
            {areasServed.map((area) => (
              <li key={area} className={styles.tag}>
                {area}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
