import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";

interface BaseButtonProps {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}

export interface ButtonAsButtonProps extends BaseButtonProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

export interface ButtonAsLinkProps extends BaseButtonProps {
  href: string;
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;
