import type { ReactNode } from "react";

import type { IconName } from "@/types/icon";

// Small, hand-authored SVG set (no icon-font/library dependency) — see
// steering/performance-optimization.md on being deliberate about new deps,
// and the reference-site audit's note that its Material Symbols icon font
// has no accessible fallback if the font fails to load.
export const iconPaths: Record<IconName, ReactNode> = {
  "chevron-down": <path d="M6 9l6 6 6-6" />,
  close: (
    <>
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </>
  ),
  menu: (
    <>
      <path d="M3 6h18" />
      <path d="M3 12h18" />
      <path d="M3 18h18" />
    </>
  ),
  check: <path d="M5 13l4 4L19 7" />,
  star: (
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
  ),
  "external-link": (
    <>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </>
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path d="M15 8h2V5h-2a4 4 0 0 0-4 4v2H9v3h2v7h3v-7h2.5l.5-3H14V9a1 1 0 0 1 1-1z" />
  ),
  twitter: (
    <path d="M22 5.9a8.2 8.2 0 0 1-2.36.65 4.1 4.1 0 0 0 1.8-2.27 8.2 8.2 0 0 1-2.6 1 4.1 4.1 0 0 0-7 3.74A11.6 11.6 0 0 1 3.4 4.7a4.1 4.1 0 0 0 1.27 5.47A4 4 0 0 1 2.8 9.7v.05a4.1 4.1 0 0 0 3.29 4.02 4.1 4.1 0 0 1-1.85.07 4.1 4.1 0 0 0 3.83 2.85A8.24 8.24 0 0 1 2 18.4a11.6 11.6 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68l-.01-.53A8.3 8.3 0 0 0 22 5.9z" />
  ),
  linkedin: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <path d="M7 10v7" />
      <path d="M7 7v.01" />
      <path d="M11 17v-4a2 2 0 0 1 4 0v4" />
      <path d="M11 10v7" />
    </>
  ),
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
    </>
  ),
};
