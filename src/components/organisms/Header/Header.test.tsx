import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { useUIStore } from "@/store/useUIStore";

import { Header } from "./Header";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

jest.mock("@/lib/sanity/image", () => ({
  urlFor: jest.fn(() => ({
    auto: jest.fn().mockReturnThis(),
    url: jest.fn(() => "https://cdn.sanity.io/images/proj/ds/mock.jpg"),
  })),
}));

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

beforeEach(() => {
  useUIStore.setState({ isMobileNavOpen: false });
});

describe("Header", () => {
  it("renders every CMS-driven nav item", () => {
    render(<Header siteName="Shubhkamna Events" navItems={navItems} />);

    for (const item of navItems) {
      expect(screen.getByRole("link", { name: item.label })).toHaveAttribute(
        "href",
        item.href,
      );
    }
  });

  it("falls back to the site name as text when no logo is given", () => {
    render(<Header siteName="Shubhkamna Events" navItems={navItems} />);

    expect(screen.getByText("Shubhkamna Events")).toBeInTheDocument();
  });

  it("renders the CTA button when both label and href are given", () => {
    render(
      <Header
        siteName="Shubhkamna Events"
        navItems={navItems}
        ctaLabel="Call Now"
        ctaHref="tel:+919754455007"
      />,
    );

    expect(screen.getByRole("link", { name: "Call Now" })).toHaveAttribute(
      "href",
      "tel:+919754455007",
    );
  });

  it("does not render a CTA when it is not configured", () => {
    render(<Header siteName="Shubhkamna Events" navItems={navItems} />);

    expect(
      screen.queryByRole("link", { name: /call/i }),
    ).not.toBeInTheDocument();
  });

  it("toggles the mobile menu open/closed and swaps the accessible name", async () => {
    const user = userEvent.setup();
    render(<Header siteName="Shubhkamna Events" navItems={navItems} />);

    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);

    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("closes the mobile menu on Escape and returns focus to the toggle", async () => {
    const user = userEvent.setup();
    render(<Header siteName="Shubhkamna Events" navItems={navItems} />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.keyboard("{Escape}");

    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
  });

  it("has no axe violations, open or closed", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Header siteName="Shubhkamna Events" navItems={navItems} />,
    );

    expect(await axe(container)).toHaveNoViolations();

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    expect(await axe(container)).toHaveNoViolations();
  });
});
