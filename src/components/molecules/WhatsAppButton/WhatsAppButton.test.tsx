import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { WhatsAppButton } from "./WhatsAppButton";

describe("WhatsAppButton", () => {
  it("links to a wa.me deep link built from the given phone number", () => {
    render(<WhatsAppButton phoneNumber="+919754455007" />);

    expect(
      screen.getByRole("link", { name: "Chat on WhatsApp" }),
    ).toHaveAttribute("href", "https://wa.me/919754455007");
  });

  it("opens in a new tab", () => {
    render(<WhatsAppButton phoneNumber="+919754455007" />);

    expect(
      screen.getByRole("link", { name: "Chat on WhatsApp" }),
    ).toHaveAttribute("target", "_blank");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <WhatsAppButton phoneNumber="+919754455007" />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
