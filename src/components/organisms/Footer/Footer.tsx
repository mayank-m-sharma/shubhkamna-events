import type { ReactNode } from "react";

import { Link } from "@/components/atoms/Link";
import { SocialLinksList } from "@/components/molecules/SocialLinksList";
import type { FooterProps } from "@/types/footerConfig";

import styles from "./Footer.module.scss";

export function Footer({
  columns,
  contactPhone,
  contactEmail,
  contactAddress,
  socialLinks,
  copyrightText,
}: FooterProps): ReactNode {
  const hasContactInfo = Boolean(
    contactPhone ?? contactEmail ?? contactAddress,
  );
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        {columns.map((column) => (
          <div key={column.title} className={styles.column}>
            <h3 className={styles.columnTitle}>{column.title}</h3>
            <ul className={styles.linkList}>
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {hasContactInfo ? (
          <address className={styles.contact}>
            {contactPhone ? (
              <Link href={`tel:${contactPhone}`}>{contactPhone}</Link>
            ) : null}
            {contactEmail ? (
              <Link href={`mailto:${contactEmail}`}>{contactEmail}</Link>
            ) : null}
            {contactAddress ? <span>{contactAddress}</span> : null}
          </address>
        ) : null}
        <SocialLinksList links={socialLinks} className={styles.social} />
      </div>
      <p className={styles.copyright}>
        © {currentYear}
        {copyrightText ? ` ${copyrightText}` : null}
      </p>
    </footer>
  );
}
