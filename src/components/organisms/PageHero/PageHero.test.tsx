import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { PageHero } from "./PageHero";

jest.mock("@/lib/sanity/image", () => ({
  urlFor: jest.fn(() => ({
    auto: jest.fn().mockReturnThis(),
    url: jest.fn(
      () => "https://cdn.sanity.io/images/proj/ds/mock-800x1000.jpg",
    ),
  })),
}));

const mockImage = {
  asset: {
    _id: "image-abc-800x1000-jpg",
    url: "https://cdn.sanity.io/images/proj/ds/abc-800x1000.jpg",
    metadata: { dimensions: { width: 800, height: 1000 } },
  },
  hotspot: undefined,
};

describe("PageHero", () => {
  it("renders the heading as the page's h1", () => {
    render(<PageHero heading="Let's Create Magic Together" />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Let's Create Magic Together",
      }),
    ).toBeInTheDocument();
  });

  it("renders the subhead only when given", () => {
    const { rerender } = render(
      <PageHero heading="Hi" subhead="Bespoke planning." />,
    );
    expect(screen.getByText("Bespoke planning.")).toBeInTheDocument();

    rerender(<PageHero heading="Hi" />);
    expect(screen.queryByText("Bespoke planning.")).not.toBeInTheDocument();
  });

  it("renders the eyebrow only when given", () => {
    const { rerender } = render(
      <PageHero heading="Hi" eyebrow="Indore's 5-Star Event Planner" />,
    );
    expect(
      screen.getByText("Indore's 5-Star Event Planner"),
    ).toBeInTheDocument();

    rerender(<PageHero heading="Hi" />);
    expect(
      screen.queryByText("Indore's 5-Star Event Planner"),
    ).not.toBeInTheDocument();
  });

  it("splits off the matching trailing highlight into its own span", () => {
    render(
      <PageHero heading="Our Elite Services" headlineHighlight="Services" />,
    );

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.querySelector("span")).toHaveTextContent("Services");
    expect(heading).toHaveTextContent("Our Elite Services");
  });

  it("renders the background image when given", () => {
    render(<PageHero heading="Hi" backgroundImage={mockImage} />);

    expect(screen.getByAltText("Hi")).toBeInTheDocument();
  });

  it("falls back gracefully with no background image", () => {
    const { container } = render(<PageHero heading="Hi" />);

    expect(container.querySelector("img")).not.toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <PageHero
        eyebrow="Indore's 5-Star Event Planner"
        heading="Our Elite Services"
        headlineHighlight="Services"
        subhead="Bespoke planning."
        backgroundImage={mockImage}
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
