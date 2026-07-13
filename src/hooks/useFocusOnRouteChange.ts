"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type RefObject } from "react";

// The App Router doesn't reset focus on client-side navigations the way a
// full page load resets it to <body> — screen reader users get no cue a
// navigation happened. Moves focus to `ref` on every pathname change after
// the initial mount (the initial load already has correct browser-default
// focus, so it's left alone).
export function useFocusOnRouteChange(
  ref: RefObject<HTMLElement | null>,
): void {
  const pathname = usePathname();
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    ref.current?.focus();
  }, [pathname, ref]);
}
