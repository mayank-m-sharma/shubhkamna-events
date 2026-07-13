"use client";

import type { ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface HeroBackgroundVideoProps {
  src: string;
  className?: string;
}

export function HeroBackgroundVideo({
  src,
  className,
}: HeroBackgroundVideoProps): ReactNode {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <video
      className={className}
      src={src}
      autoPlay={!prefersReducedMotion}
      muted
      loop
      playsInline
    />
  );
}
