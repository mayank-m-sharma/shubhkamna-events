import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { Card } from "./Card";

jest.mock("@/lib/sanity/image", () => ({
  urlFor: jest.fn(() => ({
    auto: jest.fn().mockReturnThis(),
    url: jest.fn(() => "https://cdn.sanity.io/images/proj/ds/mock-800x600.jpg"),
  })),
}));

const mockImage = {
  asset: {
    _id: "image-abc-800x600-jpg",
    url: "https://cdn.sanity.io/images/proj/ds/abc-800x600.jpg",
    metadata: { dimensions: { width: 800, height: 600 } },
  },
  hotspot: undefined,
};

describe("Card", () => {
  it("renders the heading and text from CMS data", () => {
    render(<Card heading="Weddings" text="Royal wedding planning." />);

    expect(
      screen.getByRole("heading", { name: "Weddings" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Royal wedding planning.")).toBeInTheDocument();
  });

  it("renders without text when none is given", () => {
    render(<Card heading="Weddings" />);

    expect(
      screen.getByRole("heading", { name: "Weddings" }),
    ).toBeInTheDocument();
  });

  it("renders the image with its alt text when given", () => {
    render(
      <Card
        heading="Weddings"
        image={mockImage}
        imageAlt="Wedding decor setup"
      />,
    );

    expect(screen.getByAltText("Wedding decor setup")).toBeInTheDocument();
  });

  it("renders the icon when no image is given", () => {
    const { container } = render(<Card heading="Weddings" icon="heart" />);

    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("prefers the image over the icon when both are given", () => {
    const { container } = render(
      <Card
        heading="Weddings"
        icon="heart"
        image={mockImage}
        imageAlt="Wedding decor setup"
      />,
    );

    expect(screen.getByAltText("Wedding decor setup")).toBeInTheDocument();
    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });

  it("renders as a plain article when no href is given", () => {
    const { container } = render(<Card heading="Weddings" />);

    expect(container.querySelector("article")).toBeInTheDocument();
    expect(container.querySelector("a")).not.toBeInTheDocument();
  });

  it("wraps the whole card in a single link when href is given", () => {
    render(<Card heading="Weddings" href="/services/weddings" />);

    const link = screen.getByRole("link", { name: /Weddings/ });
    expect(link).toHaveAttribute("href", "/services/weddings");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Card
        heading="Weddings"
        text="Royal wedding planning."
        image={mockImage}
        imageAlt="Wedding decor setup"
        href="/services/weddings"
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
