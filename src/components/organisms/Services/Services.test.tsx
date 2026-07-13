import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { Services } from "./Services";

jest.mock("@/lib/sanity/image", () => ({
  urlFor: jest.fn(() => ({
    auto: jest.fn().mockReturnThis(),
    url: jest.fn(() => "https://cdn.sanity.io/images/proj/ds/mock-800x600.jpg"),
  })),
}));

const items = [
  {
    icon: "heart" as const,
    title: "Weddings",
    description: "Royal wedding and engagement planning.",
    href: "/services",
  },
  {
    icon: "briefcase" as const,
    title: "Corporate",
    description: "Expert conference planning.",
    href: undefined,
  },
];

describe("Services", () => {
  it("renders the CMS heading", () => {
    render(<Services heading="What We Do Best" items={[]} />);

    expect(
      screen.getByRole("heading", { name: "What We Do Best" }),
    ).toBeInTheDocument();
  });

  it("renders the intro text only when given", () => {
    const { rerender } = render(
      <Services intro="End-to-end management services." items={[]} />,
    );
    expect(
      screen.getByText("End-to-end management services."),
    ).toBeInTheDocument();

    rerender(<Services items={[]} />);
    expect(
      screen.queryByText("End-to-end management services."),
    ).not.toBeInTheDocument();
  });

  it("renders the view-all link only when both its label and href are given", () => {
    const { rerender } = render(
      <Services
        items={[]}
        viewAllLabel="See All Services"
        viewAllHref="/services"
      />,
    );
    expect(
      screen.getByRole("link", { name: "See All Services" }),
    ).toHaveAttribute("href", "/services");

    rerender(<Services items={[]} viewAllLabel="See All Services" />);
    expect(
      screen.queryByRole("link", { name: "See All Services" }),
    ).not.toBeInTheDocument();
  });

  it("renders no cards when there are zero items", () => {
    render(<Services items={[]} />);

    expect(screen.queryAllByRole("heading", { level: 3 })).toHaveLength(0);
  });

  it("renders one card for a single item", () => {
    render(<Services items={[items[0]!]} />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Weddings" }),
    ).toBeInTheDocument();
  });

  it("renders a card per item, linking each to its optional href", () => {
    render(<Services items={items} />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Weddings" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Corporate" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Weddings/ })).toHaveAttribute(
      "href",
      "/services",
    );
  });

  it("renders an item with no href as plain content, not a link", () => {
    render(<Services items={[items[1]!]} />);

    expect(
      screen.queryByRole("link", { name: /Corporate/ }),
    ).not.toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Services
        heading="What We Do Best"
        intro="End-to-end management services."
        viewAllLabel="See All Services"
        viewAllHref="/services"
        items={items}
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
