"use client";

import { createContext, type ReactNode } from "react";

import type { SiteTheme, ThemeContextProviderProps } from "@/types/theme";

export const ThemeContext = createContext<SiteTheme | undefined>(undefined);

export function ThemeContextProvider({
  theme,
  children,
}: ThemeContextProviderProps): ReactNode {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}
