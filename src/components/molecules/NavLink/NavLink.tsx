"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { Link } from "@/components/atoms/Link";
import type { NavLinkProps } from "@/types/navLink";

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
      className={className}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
