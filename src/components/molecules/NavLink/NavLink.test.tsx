import { render, screen } from "@testing-library/react";

import { NavLink } from "./NavLink";

const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

describe("NavLink", () => {
  it("renders the link with its children", () => {
    mockUsePathname.mockReturnValue("/about");
    render(<NavLink href="/services">Services</NavLink>);

    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute(
      "href",
      "/services",
    );
  });

  it("marks itself as the current page when the pathname matches", () => {
    mockUsePathname.mockReturnValue("/services");
    render(<NavLink href="/services">Services</NavLink>);

    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("does not mark itself current when the pathname does not match", () => {
    mockUsePathname.mockReturnValue("/about");
    render(<NavLink href="/services">Services</NavLink>);

    expect(screen.getByRole("link", { name: "Services" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("applies a distinct visual style when it is the current page", () => {
    mockUsePathname.mockReturnValue("/services");
    render(<NavLink href="/services">Services</NavLink>);

    expect(screen.getByRole("link", { name: "Services" })).toHaveClass(
      "active",
    );
  });

  it("does not apply the active style when it is not the current page", () => {
    mockUsePathname.mockReturnValue("/about");
    render(<NavLink href="/services">Services</NavLink>);

    expect(screen.getByRole("link", { name: "Services" })).not.toHaveClass(
      "active",
    );
  });
});
