import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { ServiceCard } from "./ServiceCard";

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
  title: "Weddings",
  description:
    "Complete wedding planning and engagement coordination with customized themes.",
  image: mockImage,
  imageAlt: "Wedding Planning by Shubhkamna Events",
  icon: "heart" as const,
  features: [
    "Wedding & Engagement planning",
    "Royal Theme Decor Design",
    "Destination Wedding planning",
  ],
  ctaLabel: "Enquire for Wedding",
  ctaHref: "/contact",
  detailHref: "/services/weddings",
};

describe("ServiceCard", () => {
  it("renders the title and description", () => {
    render(<ServiceCard {...baseProps} />);

    expect(
      screen.getByRole("heading", { name: "Weddings" }),
    ).toBeInTheDocument();
    expect(screen.getByText(baseProps.description)).toBeInTheDocument();
  });

  it("links the image/title area to the service's detail page", () => {
    render(<ServiceCard {...baseProps} />);

    expect(screen.getByRole("link", { name: /Weddings/ })).toHaveAttribute(
      "href",
      "/services/weddings",
    );
  });

  it("renders every feature", () => {
    render(<ServiceCard {...baseProps} />);

    for (const feature of baseProps.features) {
      expect(screen.getByText(feature)).toBeInTheDocument();
    }
  });

  it("renders the CTA as a separate link to ctaHref, not the detail page", () => {
    render(<ServiceCard {...baseProps} />);

    expect(
      screen.getByRole("link", { name: "Enquire for Wedding" }),
    ).toHaveAttribute("href", "/contact");
  });

  it("renders the image with meaningful alt text", () => {
    render(<ServiceCard {...baseProps} />);

    expect(
      screen.getByAltText("Wedding Planning by Shubhkamna Events"),
    ).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(<ServiceCard {...baseProps} />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
