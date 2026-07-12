import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

import styles from "./Heading.module.scss";

type HeadingLevel = "h1" | "h2" | "h3";
type HeadingSize = "md" | "lg" | "xl";

interface HeadingProps {
  as: HeadingLevel;
  size?: HeadingSize;
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Heading({
  as,
  size = "md",
  children,
  className,
  id,
}: HeadingProps): ReactNode {
  const Tag: ElementType = as;

  return (
    <Tag id={id} className={cn(styles.heading, styles[size], className)}>
      {children}
    </Tag>
  );
}
