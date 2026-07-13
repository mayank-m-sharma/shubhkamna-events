"use client";

import { useRef, type ReactNode } from "react";

import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Image } from "@/components/atoms/Image";
import { Link } from "@/components/atoms/Link";
import { NavLink } from "@/components/molecules/NavLink";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { cn } from "@/lib/utils/cn";
import { useUIStore } from "@/store/useUIStore";
import type { HeaderProps } from "@/types/headerConfig";

import styles from "./Header.module.scss";

const NAV_ID = "primary-navigation";

export function Header({
  siteName,
  logo,
  navItems,
  ctaLabel,
  ctaHref,
}: HeaderProps): ReactNode {
  const isMobileNavOpen = useUIStore((state) => state.isMobileNavOpen);
  const toggleMobileNav = useUIStore((state) => state.toggleMobileNav);
  const closeMobileNav = useUIStore((state) => state.closeMobileNav);
  const navRef = useRef<HTMLElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useFocusTrap(navRef, {
    active: isMobileNavOpen,
    onClose: closeMobileNav,
    returnFocusRef: toggleButtonRef,
  });

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.bar}>
          <Link href="/" className={styles.logoLink}>
            {logo ? (
              <Image image={logo} alt={siteName} sizes="160px" />
            ) : (
              <>
                <Icon name="logo" size="lg" className={styles.logoIcon} />
                <span className={styles.siteName}>{siteName}</span>
              </>
            )}
          </Link>
          <button
            ref={toggleButtonRef}
            type="button"
            className={styles.menuToggle}
            aria-expanded={isMobileNavOpen}
            aria-controls={NAV_ID}
            aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
            onClick={toggleMobileNav}
          >
            <Icon name={isMobileNavOpen ? "close" : "menu"} />
          </button>
        </div>
        <nav
          id={NAV_ID}
          ref={navRef}
          aria-label="Primary"
          className={cn(styles.nav, isMobileNavOpen && styles.open)}
        >
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
          {ctaLabel && ctaHref ? (
            <Button href={ctaHref} variant="primary">
              {ctaLabel}
            </Button>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
