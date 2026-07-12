"use client";

import { useContext } from "react";

import { ThemeContext } from "@/lib/theme/ThemeContext";
import type { SiteTheme } from "@/types/theme";

// Escape hatch for the rare component that needs a theme value in JS rather
// than CSS — most consumption should stay CSS-only via `var(--token-name)`.
export function useTheme(): SiteTheme {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return theme;
}
