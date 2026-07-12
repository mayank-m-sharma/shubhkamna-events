import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { Icon } from "./Icon";

describe("Icon", () => {
  it("is hidden from assistive tech by default (decorative)", () => {
    const { container } = render(<Icon name="star" />);
    const svg = container.querySelector("svg");

    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("exposes an accessible name via role=img when a title is given", () => {
    render(<Icon name="close" title="Close menu" />);

    expect(screen.getByRole("img", { name: "Close menu" })).toBeInTheDocument();
  });

  it("applies the requested size class", () => {
    const { container } = render(<Icon name="menu" size="lg" />);

    expect(container.querySelector("svg")).toHaveClass("lg");
  });

  it("has no axe violations when used decoratively or with a title", async () => {
    const { container: decorative } = render(<Icon name="star" />);
    const { container: labelled } = render(
      <Icon name="close" title="Close menu" />,
    );

    expect(await axe(decorative)).toHaveNoViolations();
    expect(await axe(labelled)).toHaveNoViolations();
  });
});
