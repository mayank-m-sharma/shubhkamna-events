"use client";

import { useRef, type ReactNode } from "react";

import { useFocusOnRouteChange } from "@/hooks/useFocusOnRouteChange";

export function MainContent({ children }: { children: ReactNode }): ReactNode {
  const mainRef = useRef<HTMLElement>(null);

  useFocusOnRouteChange(mainRef);

  return (
    <main id="main-content" ref={mainRef} tabIndex={-1}>
      {children}
    </main>
  );
}
