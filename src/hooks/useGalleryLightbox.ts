"use client";

import { useRef, useState } from "react";

// Shared lightbox-trigger state (which image is open, keyboard wraparound
// navigation, and returning focus to the exact trigger that opened it) —
// used by every gallery grid layout (Gallery's CSS grid, GalleryMasonry's
// CSS-columns layout) so they can't drift on this behavior.
export function useGalleryLightbox(itemCount: number): {
  activeIndex: number | null;
  openLightbox: (index: number) => void;
  closeLightbox: () => void;
  handleNavigate: (direction: -1 | 1) => void;
  setTriggerRef: (index: number, el: HTMLButtonElement | null) => void;
  returnFocusRef: React.RefObject<HTMLElement | null>;
} {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  function openLightbox(index: number): void {
    returnFocusRef.current = triggerRefs.current[index] ?? null;
    setActiveIndex(index);
  }

  function closeLightbox(): void {
    setActiveIndex(null);
  }

  function handleNavigate(direction: -1 | 1): void {
    setActiveIndex((current) => {
      if (current === null || itemCount === 0) {
        return current;
      }

      return (current + direction + itemCount) % itemCount;
    });
  }

  function setTriggerRef(index: number, el: HTMLButtonElement | null): void {
    triggerRefs.current[index] = el;
  }

  return {
    activeIndex,
    openLightbox,
    closeLightbox,
    handleNavigate,
    setTriggerRef,
    returnFocusRef,
  };
}
