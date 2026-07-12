import type { ReactNode } from "react";

import { getSiteTheme } from "@/lib/sanity/getSiteTheme";
import { buildThemeStyle } from "@/lib/theme/buildThemeStyle";
import { ThemeContextProvider } from "@/lib/theme/ThemeContext";
import type { ThemeProviderProps } from "@/types/theme";

// Server component: fetches the published siteTheme (or SHU-001's fallback),
// injects it as CSS custom properties, and exposes it to any client
// component that needs a theme value in JS via useTheme().
export async function ThemeProvider({
  children,
}: ThemeProviderProps): Promise<ReactNode> {
  const theme = await getSiteTheme();

  return (
    <ThemeContextProvider theme={theme}>
      <style>{buildThemeStyle(theme)}</style>
      {children}
    </ThemeContextProvider>
  );
}
