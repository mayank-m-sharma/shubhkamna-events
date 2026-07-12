import { renderHook } from "@testing-library/react";

import { ThemeContextProvider } from "@/lib/theme/ThemeContext";
import { fallbackSiteTheme } from "@/lib/validations/theme.schema";

import { useTheme } from "./useTheme";

describe("useTheme", () => {
  it("returns the theme provided by the nearest ThemeContextProvider", () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <ThemeContextProvider theme={fallbackSiteTheme}>
          {children}
        </ThemeContextProvider>
      ),
    });

    expect(result.current).toEqual(fallbackSiteTheme);
  });

  it("throws when used outside a ThemeContextProvider", () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      "useTheme must be used within a ThemeProvider",
    );
  });
});
