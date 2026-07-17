import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { FAQ } from "./FAQ";

const items = [
  {
    question: "Do you serve destination weddings?",
    answer: "Yes, across India.",
  },
  { question: "Are you open 24/7?", answer: "Yes, always." },
];

describe("FAQ", () => {
  it("renders every question, answers collapsed by default", () => {
    render(<FAQ items={items} />);

    for (const item of items) {
      expect(
        screen.getByRole("button", { name: item.question }),
      ).toHaveAttribute("aria-expanded", "false");
    }
  });

  it("toggles a question's answer open/closed independently on click", async () => {
    const user = userEvent.setup();
    render(<FAQ items={items} />);

    const firstButton = screen.getByRole("button", {
      name: items[0]!.question,
    });
    await user.click(firstButton);

    expect(firstButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(items[0]!.answer)).toBeVisible();
    expect(
      screen.getByRole("button", { name: items[1]!.question }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("allows multiple items open simultaneously (not an exclusive accordion)", async () => {
    const user = userEvent.setup();
    render(<FAQ items={items} />);

    await user.click(screen.getByRole("button", { name: items[0]!.question }));
    await user.click(screen.getByRole("button", { name: items[1]!.question }));

    expect(
      screen.getByRole("button", { name: items[0]!.question }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("button", { name: items[1]!.question }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("toggles open/closed with the keyboard (Enter)", async () => {
    const user = userEvent.setup();
    render(<FAQ items={items} />);

    const firstButton = screen.getByRole("button", {
      name: items[0]!.question,
    });
    firstButton.focus();
    await user.keyboard("{Enter}");

    expect(firstButton).toHaveAttribute("aria-expanded", "true");
  });

  it("renders the heading and intro when given", () => {
    render(
      <FAQ heading="Common Inquiries" intro="Got questions?" items={items} />,
    );

    expect(
      screen.getByRole("heading", { name: "Common Inquiries" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Got questions?")).toBeInTheDocument();
  });

  it("renders nothing when there are zero items", () => {
    const { container } = render(<FAQ items={[]} />);

    expect(container.querySelector("button")).not.toBeInTheDocument();
  });

  it("has no axe violations, collapsed or expanded", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <FAQ heading="Common Inquiries" items={items} />,
    );

    expect(await axe(container)).toHaveNoViolations();

    await user.click(screen.getByRole("button", { name: items[0]!.question }));

    expect(await axe(container)).toHaveNoViolations();
  });
});
