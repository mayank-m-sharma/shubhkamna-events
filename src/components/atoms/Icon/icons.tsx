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
};
