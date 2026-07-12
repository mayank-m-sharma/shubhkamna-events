import type { ReactNode } from "react";

import { Link } from "@/components/atoms/Link";
import { cn } from "@/lib/utils/cn";
import type { ButtonProps } from "@/types/button";

import styles from "./Button.module.scss";

export function Button(props: ButtonProps): ReactNode {
  const { variant = "primary", children, className } = props;
  const classes = cn(styles.button, styles[variant], className);

  if (typeof props.href === "string") {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      disabled={props.disabled}
      onClick={props.onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
