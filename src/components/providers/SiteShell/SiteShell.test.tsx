import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { getFooterConfig } from "@/lib/sanity/getFooterConfig";
import { getHeaderConfig } from "@/lib/sanity/getHeaderConfig";
import { getSiteSettings } from "@/lib/sanity/getSiteSettings";
import { fallbackFooterConfig } from "@/lib/validations/footerConfig.schema";
import { fallbackHeaderConfig } from "@/lib/validations/headerConfig.schema";
import { fallbackSiteSettings } from "@/lib/validations/siteSettings.schema";

import { SiteShell } from "./SiteShell";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

jest.mock("@/lib/sanity/image", () => ({
  urlFor: jest.fn(() => ({
    auto: jest.fn().mockReturnThis(),
    url: jest.fn(() => "https://cdn.sanity.io/images/proj/ds/mock.jpg"),
  })),
}));

jest.mock("@/lib/sanity/getHeaderConfig", () => ({
  getHeaderConfig: jest.fn(),
}));
jest.mock("@/lib/sanity/getFooterConfig", () => ({
  getFooterConfig: jest.fn(),
}));
jest.mock("@/lib/sanity/getSiteSettings", () => ({
  getSiteSettings: jest.fn(),
}));

const mockGetHeaderConfig = jest.mocked(getHeaderConfig);
const mockGetFooterConfig = jest.mocked(getFooterConfig);
const mockGetSiteSettings = jest.mocked(getSiteSettings);

beforeEach(() => {
  mockGetHeaderConfig.mockResolvedValue(fallbackHeaderConfig);
  mockGetFooterConfig.mockResolvedValue(fallbackFooterConfig);
  mockGetSiteSettings.mockResolvedValue(fallbackSiteSettings);
});

describe("SiteShell", () => {
  it("renders exactly one header, nav, main, and footer landmark", async () => {
    const ui = await SiteShell({ children: <p>Page content</p> });
    render(ui);

    expect(screen.getAllByRole("banner")).toHaveLength(1);
    expect(screen.getAllByRole("navigation")).toHaveLength(1);
    expect(screen.getAllByRole("main")).toHaveLength(1);
    expect(screen.getAllByRole("contentinfo")).toHaveLength(1);
  });

  it("renders the page children inside the main landmark", async () => {
    const ui = await SiteShell({ children: <p>Page content</p> });
    render(ui);

    expect(screen.getByRole("main").querySelector("p")).toHaveTextContent(
      "Page content",
    );
  });

  it("renders a skip link targeting the main landmark", async () => {
    const ui = await SiteShell({ children: <p>Page content</p> });
    render(ui);

    expect(
      screen.getByRole("link", { name: "Skip to content" }),
    ).toHaveAttribute("href", "#main-content");
  });

  it("prefers headerConfig's logo override, falling back to siteSettings' logo", async () => {
    mockGetSiteSettings.mockResolvedValueOnce({
      ...fallbackSiteSettings,
      siteName: "Shubhkamna Events",
    });

    const ui = await SiteShell({ children: <p>Page content</p> });
    render(ui);

    expect(screen.getByText("Shubhkamna Events")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const ui = await SiteShell({ children: <p>Page content</p> });
    const { container } = render(ui);

    expect(await axe(container)).toHaveNoViolations();
  });
});
