import NextLink from "next/link";
import type { ReactNode } from "react";

import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils/cn";
import type { LinkProps } from "@/types/link";

import styles from "./Link.module.scss";

function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}

export function Link({
  href,
  children,
  className,
  "aria-current": ariaCurrent,
}: LinkProps): ReactNode {
  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(styles.link, className)}
        aria-current={ariaCurrent}
      >
        {children}
        <Icon name="external-link" size="sm" className={styles.externalIcon} />
        <span className={styles.visuallyHidden}>(opens in a new tab)</span>
      </a>
    );
  }

  return (
    <NextLink
      href={href}
      className={cn(styles.link, className)}
      aria-current={ariaCurrent}
    >
      {children}
    </NextLink>
  );
}
