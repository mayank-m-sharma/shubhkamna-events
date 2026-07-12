import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

import styles from "./Text.module.scss";

type TextSize = "base" | "md";

interface TextProps {
  size?: TextSize;
  muted?: boolean;
  children: ReactNode;
  className?: string;
}

export function Text({
  size = "base",
  muted = false,
  children,
  className,
}: TextProps): ReactNode {
  return (
    <p
      className={cn(
        styles.text,
        styles[size],
        muted && styles.muted,
        className,
      )}
    >
      {children}
    </p>
  );
}
