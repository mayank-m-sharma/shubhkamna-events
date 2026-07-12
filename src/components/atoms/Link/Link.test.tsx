import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { Link } from "./Link";

describe("Link", () => {
  it("renders an internal path as a next/link anchor with no target/rel", () => {
    render(<Link href="/about">About</Link>);

    const anchor = screen.getByRole("link", { name: "About" });
    expect(anchor).toHaveAttribute("href", "/about");
    expect(anchor).not.toHaveAttribute("target");
    expect(anchor).not.toHaveAttribute("rel");
  });

  it("renders a hash link as internal", () => {
    render(<Link href="#section">Jump</Link>);

    const anchor = screen.getByRole("link", { name: "Jump" });
    expect(anchor).not.toHaveAttribute("target");
  });

  it("renders an absolute http(s) link as external, with rel=noopener noreferrer and a new-tab target", () => {
    render(<Link href="https://example.com">Example</Link>);

    const anchor = screen.getByRole("link", { name: /Example/ });
    expect(anchor).toHaveAttribute("href", "https://example.com");
    expect(anchor).toHaveAttribute("target", "_blank");
    expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("gives an external link a visual affordance and a screen-reader note", () => {
    render(<Link href="https://example.com">Example</Link>);

    expect(screen.getByText("(opens in a new tab)")).toBeInTheDocument();
  });

  it("does not treat tel:/mailto: links as external", () => {
    render(<Link href="tel:+919754455007">Call us</Link>);

    const anchor = screen.getByRole("link", { name: "Call us" });
    expect(anchor).not.toHaveAttribute("target");
    expect(anchor).not.toHaveAttribute("rel");
  });

  it("has no axe violations for an external link", async () => {
    const { container } = render(
      <Link href="https://example.com">Example</Link>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
