import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { Hero } from "./Hero";

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

const baseProps = {
  headline: "Your Vision, Our Magic.",
  primaryCtaLabel: "Plan Your Event",
  primaryCtaHref: "/contact",
};

describe("Hero", () => {
  it("renders the CMS headline as the page's h1", () => {
    render(<Hero {...baseProps} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Your Vision, Our Magic.",
      }),
    ).toBeInTheDocument();
  });

  it("renders the primary CTA link", () => {
    render(<Hero {...baseProps} />);

    expect(
      screen.getByRole("link", { name: "Plan Your Event" }),
    ).toHaveAttribute("href", "/contact");
  });

  it("renders the subhead only when given", () => {
    const { rerender } = render(
      <Hero {...baseProps} subhead="Indore's finest." />,
    );
    expect(screen.getByText("Indore's finest.")).toBeInTheDocument();

    rerender(<Hero {...baseProps} />);
    expect(screen.queryByText("Indore's finest.")).not.toBeInTheDocument();
  });

  it("renders the secondary CTA only when both its label and href are given", () => {
    const { rerender } = render(
      <Hero
        {...baseProps}
        secondaryCtaLabel="View Portfolio"
        secondaryCtaHref="/gallery"
      />,
    );
    expect(
      screen.getByRole("link", { name: "View Portfolio" }),
    ).toHaveAttribute("href", "/gallery");

    rerender(<Hero {...baseProps} secondaryCtaLabel="View Portfolio" />);
    expect(
      screen.queryByRole("link", { name: "View Portfolio" }),
    ).not.toBeInTheDocument();
  });

  it("renders the background image with meaningful alt text when given", () => {
    render(
      <Hero
        {...baseProps}
        backgroundImage={mockImage}
        backgroundImageAlt="Shubhkamna Events luxury wedding planning Indore"
      />,
    );

    expect(
      screen.getByAltText("Shubhkamna Events luxury wedding planning Indore"),
    ).toBeInTheDocument();
  });

  it("falls back to the headline as alt text when no alt is supplied", () => {
    render(<Hero {...baseProps} backgroundImage={mockImage} />);

    expect(screen.getByAltText("Your Vision, Our Magic.")).toBeInTheDocument();
  });

  it("falls back gracefully with no background image or video set", () => {
    const { container } = render(<Hero {...baseProps} />);

    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(container.querySelector("video")).not.toBeInTheDocument();
  });

  it("renders the trust badge only when both reviewRating and reviewCount are set", () => {
    const { rerender } = render(
      <Hero {...baseProps} reviewRating={5} reviewCount={50} />,
    );
    expect(screen.getByText(/5.*Google Rating.*50/)).toBeInTheDocument();

    rerender(<Hero {...baseProps} reviewRating={5} />);
    expect(screen.queryByText(/Google Rating/)).not.toBeInTheDocument();
  });

  it("splits off the matching trailing highlight into its own span, keeping the full text as the accessible name", () => {
    render(<Hero {...baseProps} headlineHighlight="Our Magic." />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Your Vision, Our Magic.",
    });
    expect(heading.querySelector("span")).toHaveTextContent("Our Magic.");
  });

  it("renders the headline plainly when the highlight doesn't match the end of the headline", () => {
    render(<Hero {...baseProps} headlineHighlight="Nonexistent" />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.querySelector("span")).not.toBeInTheDocument();
    expect(heading).toHaveTextContent("Your Vision, Our Magic.");
  });

  it("renders the secondary accent image only when a background image is also set", () => {
    const { rerender } = render(
      <Hero
        {...baseProps}
        backgroundImage={mockImage}
        secondaryImage={mockImage}
        secondaryImageAlt="Shubhkamna Events decor setup"
      />,
    );
    expect(
      screen.getByAltText("Shubhkamna Events decor setup"),
    ).toBeInTheDocument();

    rerender(
      <Hero
        {...baseProps}
        secondaryImage={mockImage}
        secondaryImageAlt="Shubhkamna Events decor setup"
      />,
    );
    expect(
      screen.queryByAltText("Shubhkamna Events decor setup"),
    ).not.toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Hero
        {...baseProps}
        headlineHighlight="Our Magic."
        subhead="Indore's 5-star premier event planner."
        backgroundImage={mockImage}
        backgroundImageAlt="Shubhkamna Events luxury wedding planning Indore"
        secondaryCtaLabel="View Portfolio"
        secondaryCtaHref="/gallery"
        secondaryImage={mockImage}
        reviewRating={5}
        reviewCount={50}
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
