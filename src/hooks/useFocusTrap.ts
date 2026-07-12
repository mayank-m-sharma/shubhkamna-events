"use client";

import { useEffect, type RefObject } from "react";

interface UseFocusTrapOptions {
  active: boolean;
  onClose: () => void;
  // Element to return focus to once deactivated (e.g. the button that
  // opened the panel) — falls back to whatever had focus before activation.
  returnFocusRef?: RefObject<HTMLElement | null>;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

// Traps Tab/Shift+Tab within `containerRef` while `active`, closes on
// Escape, and restores focus on deactivation — used by any overlay that
// must not leave a keyboard user stranded (mobile nav, lightbox, modal).
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  { active, onClose, returnFocusRef }: UseFocusTrapOptions,
): void {
  useEffect(() => {
    if (!active) {
      return undefined;
    }

    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const elementToRefocus = returnFocusRef?.current ?? previouslyFocused;
    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    );

    focusable[0]?.focus();

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      elementToRefocus?.focus();
    };
  }, [active, containerRef, onClose, returnFocusRef]);
}
