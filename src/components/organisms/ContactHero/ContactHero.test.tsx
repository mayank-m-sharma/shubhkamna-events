import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { ContactHero } from "./ContactHero";

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

describe("ContactHero", () => {
  it("renders the heading as the page's h1", () => {
    render(<ContactHero heading="Let's Create Magic Together" />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Let's Create Magic Together",
      }),
    ).toBeInTheDocument();
  });

  it("renders the subhead only when given", () => {
    const { rerender } = render(
      <ContactHero heading="Hi" subhead="Bespoke planning." />,
    );
    expect(screen.getByText("Bespoke planning.")).toBeInTheDocument();

    rerender(<ContactHero heading="Hi" />);
    expect(screen.queryByText("Bespoke planning.")).not.toBeInTheDocument();
  });

  it("renders the background image when given", () => {
    render(<ContactHero heading="Hi" backgroundImage={mockImage} />);

    expect(screen.getByAltText("Hi")).toBeInTheDocument();
  });

  it("falls back gracefully with no background image", () => {
    const { container } = render(<ContactHero heading="Hi" />);

    expect(container.querySelector("img")).not.toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <ContactHero
        heading="Let's Create Magic Together"
        subhead="Bespoke planning."
        backgroundImage={mockImage}
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
