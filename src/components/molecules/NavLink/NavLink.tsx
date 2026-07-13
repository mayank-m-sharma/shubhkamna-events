"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { Link } from "@/components/atoms/Link";
import { cn } from "@/lib/utils/cn";
import type { NavLinkProps } from "@/types/navLink";

import styles from "./NavLink.module.scss";

export function NavLink({
  href,
  children,
  className,
}: NavLinkProps): ReactNode {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(isActive && styles.active, className)}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
