import type { ReactNode } from "react";

import { iconPaths } from "@/components/atoms/Icon/icons";
import { cn } from "@/lib/utils/cn";
import type { IconProps } from "@/types/icon";

import styles from "./Icon.module.scss";

export function Icon({
  name,
  size = "md",
  title,
  className,
}: IconProps): ReactNode {
  const isDecorative = !title;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(styles.icon, styles[size], className)}
      aria-hidden={isDecorative ? "true" : undefined}
      role={isDecorative ? undefined : "img"}
      aria-label={title}
    >
      {iconPaths[name]}
    </svg>
  );
}
