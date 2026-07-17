import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { CtaBanner } from "./CtaBanner";

const baseProps = {
  heading: "Start Your Journey with Shubhkamna Events",
  body: "Indore's top-rated planners are just a click away.",
  phone: "+919754455007",
  secondaryLabel: "Our Past Work",
  secondaryHref: "/gallery",
};

describe("CtaBanner", () => {
  it("renders the heading and body", () => {
    render(<CtaBanner {...baseProps} />);

    expect(
      screen.getByRole("heading", {
        name: "Start Your Journey with Shubhkamna Events",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Indore's top-rated planners are just a click away."),
    ).toBeInTheDocument();
  });

  it("renders the phone link only when given", () => {
    const { rerender } = render(<CtaBanner {...baseProps} />);
    expect(
      screen.getByRole("link", { name: /\+919754455007/ }),
    ).toHaveAttribute("href", "tel:+919754455007");

    rerender(<CtaBanner {...baseProps} phone={undefined} />);
    expect(
      screen.queryByRole("link", { name: /\+919754455007/ }),
    ).not.toBeInTheDocument();
  });

  it("renders the secondary CTA only when both label and href are given", () => {
    const { rerender } = render(<CtaBanner {...baseProps} />);
    expect(screen.getByRole("link", { name: "Our Past Work" })).toHaveAttribute(
      "href",
      "/gallery",
    );

    rerender(<CtaBanner {...baseProps} secondaryLabel={undefined} />);
    expect(
      screen.queryByRole("link", { name: "Our Past Work" }),
    ).not.toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(<CtaBanner {...baseProps} />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
