import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { Process } from "./Process";

const steps = [
  {
    icon: "chat" as const,
    title: "Consultation",
    description: "Discuss your vision.",
  },
  {
    icon: "palette" as const,
    title: "Design",
    description: "Bespoke theme decor design.",
  },
  {
    icon: "calendar" as const,
    title: "Coordination",
    description: "Full planning and staffing.",
  },
  {
    icon: "check" as const,
    title: "Execution",
    description: "Flawless execution.",
  },
];

describe("Process", () => {
  it("renders every step's title and description in order", () => {
    render(<Process steps={steps} />);

    const titles = screen
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);
    expect(titles).toEqual([
      "Consultation",
      "Design",
      "Coordination",
      "Execution",
    ]);

    for (const step of steps) {
      expect(screen.getByText(step.description)).toBeInTheDocument();
    }
  });

  it("numbers each step", () => {
    render(<Process steps={steps} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("renders the eyebrow and heading only when given", () => {
    const { rerender } = render(
      <Process
        eyebrow="Our Process"
        heading="Shubhkamna Events Roadmap"
        steps={steps}
      />,
    );
    expect(screen.getByText("Our Process")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Shubhkamna Events Roadmap" }),
    ).toBeInTheDocument();

    rerender(<Process steps={steps} />);
    expect(screen.queryByText("Our Process")).not.toBeInTheDocument();
  });

  it("renders nothing when there are zero steps", () => {
    const { container } = render(<Process steps={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Process
        eyebrow="Our Process"
        heading="Shubhkamna Events Roadmap"
        steps={steps}
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
