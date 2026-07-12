import type { ReactNode } from "react";

import { Icon } from "@/components/atoms/Icon";
import { Link } from "@/components/atoms/Link";
import { platformMeta } from "@/components/molecules/SocialLinksList/platformMeta";
import { cn } from "@/lib/utils/cn";
import type { SocialLinksListProps } from "@/types/socialLinksList";

import styles from "./SocialLinksList.module.scss";

export function SocialLinksList({
  links,
  className,
}: SocialLinksListProps): ReactNode {
  if (links.length === 0) {
    return null;
  }

  return (
    <ul className={cn(styles.list, className)}>
      {links.map(({ platform, url }) => {
        const { icon, label } = platformMeta[platform];

        return (
          <li key={url}>
            <Link href={url}>
              <Icon name={icon} />
              <span className={styles.visuallyHidden}>{label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
