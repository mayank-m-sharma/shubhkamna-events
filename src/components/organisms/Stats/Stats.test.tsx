import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { Stats } from "./Stats";

const items = [
  { value: "50+", label: "Verified Reviews" },
  { value: "5.0★", label: "Google Rating" },
  { value: "24/7", label: "Open All Days" },
  { value: "1000+", label: "Happy Events" },
];

describe("Stats", () => {
  it("renders every stat item's value and label", () => {
    render(<Stats items={items} />);

    for (const item of items) {
      expect(screen.getByText(item.value)).toBeInTheDocument();
      expect(screen.getByText(item.label)).toBeInTheDocument();
    }
  });

  it("renders the heading when given", () => {
    render(<Stats heading="Trusted by Hundreds" items={items} />);

    expect(
      screen.getByRole("heading", { name: "Trusted by Hundreds" }),
    ).toBeInTheDocument();
  });

  it("renders nothing when there are zero items", () => {
    const { container } = render(<Stats items={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("handles a single item gracefully", () => {
    render(<Stats items={[items[0]!]} />);

    expect(screen.getByText("50+")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Stats heading="Trusted by Hundreds" items={items} />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
