import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { getSiteTheme } from "@/lib/sanity/getSiteTheme";
import { fallbackSiteTheme } from "@/lib/validations/theme.schema";

import { ThemeProvider } from "./ThemeProvider";

jest.mock("@/lib/sanity/getSiteTheme", () => ({
  getSiteTheme: jest.fn(),
}));

const mockGetSiteTheme = jest.mocked(getSiteTheme);

describe("ThemeProvider", () => {
  it("renders a :root style block with the fetched theme's colors", async () => {
    mockGetSiteTheme.mockResolvedValueOnce({
      ...fallbackSiteTheme,
      colorPrimary: "#1a227f",
    });

    const ui = await ThemeProvider({ children: <p>Hello</p> });
    const { container } = render(ui);

    expect(container.querySelector("style")?.textContent).toContain(
      "--color-primary:#1a227f;",
    );
  });

  it("renders its children", async () => {
    mockGetSiteTheme.mockResolvedValueOnce(fallbackSiteTheme);

    const ui = await ThemeProvider({ children: <p>Hello</p> });
    render(ui);

    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("falls back gracefully with no axe violations when the theme fetch returns the fallback", async () => {
    mockGetSiteTheme.mockResolvedValueOnce(fallbackSiteTheme);

    const ui = await ThemeProvider({ children: <p>Hello</p> });
    const { container } = render(ui);

    expect(await axe(container)).toHaveNoViolations();
  });
});
