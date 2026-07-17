import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { About } from "./About";

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
  eyebrow: "About Shubhkamna Events",
  heading: "Elite Event Planning Experts in Indore",
  bodyFirst: "Based in Chhawni, Indore, we manage everything with precision.",
  bodySecond: "Our team believes in helpful, clear communication.",
  checklist: [
    "Corporate & Conference coordination",
    "Theme party & Decor design",
    "Destination Wedding planning",
  ],
  ctaLabel: "Contact Our Team",
  ctaHref: "/contact",
  imageFirst: mockImage,
  imageFirstAlt: "Shubhkamna Events wedding decoration setup",
};

describe("About", () => {
  it("renders the heading and both body paragraphs", () => {
    render(<About {...baseProps} />);

    expect(
      screen.getByRole("heading", {
        name: "Elite Event Planning Experts in Indore",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(baseProps.bodyFirst)).toBeInTheDocument();
    expect(screen.getByText(baseProps.bodySecond)).toBeInTheDocument();
  });

  it("renders the eyebrow only when given", () => {
    const { rerender } = render(<About {...baseProps} />);
    expect(screen.getByText("About Shubhkamna Events")).toBeInTheDocument();

    rerender(<About {...baseProps} eyebrow={undefined} />);
    expect(
      screen.queryByText("About Shubhkamna Events"),
    ).not.toBeInTheDocument();
  });

  it("renders every checklist item", () => {
    render(<About {...baseProps} />);

    for (const item of baseProps.checklist) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });

  it("renders the CTA link only when both label and href are given", () => {
    const { rerender } = render(<About {...baseProps} />);
    expect(
      screen.getByRole("link", { name: "Contact Our Team" }),
    ).toHaveAttribute("href", "/contact");

    rerender(<About {...baseProps} ctaLabel={undefined} />);
    expect(
      screen.queryByRole("link", { name: "Contact Our Team" }),
    ).not.toBeInTheDocument();
  });

  it("renders the first image with meaningful alt text", () => {
    render(<About {...baseProps} />);

    expect(
      screen.getByAltText("Shubhkamna Events wedding decoration setup"),
    ).toBeInTheDocument();
  });

  it("renders the second image only when given", () => {
    const { rerender } = render(<About {...baseProps} />);
    expect(
      screen.queryByAltText("Shubhkamna Events wedding planning Indore"),
    ).not.toBeInTheDocument();

    rerender(
      <About
        {...baseProps}
        imageSecond={mockImage}
        imageSecondAlt="Shubhkamna Events wedding planning Indore"
      />,
    );
    expect(
      screen.getByAltText("Shubhkamna Events wedding planning Indore"),
    ).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <About
        {...baseProps}
        imageSecond={mockImage}
        imageSecondAlt="Shubhkamna Events wedding planning Indore"
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
