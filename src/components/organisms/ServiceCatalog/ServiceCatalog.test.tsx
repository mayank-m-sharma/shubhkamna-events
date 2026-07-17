import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { ServiceCatalog } from "./ServiceCatalog";

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

const services = [
  {
    title: "Weddings",
    slug: "weddings",
    icon: "heart" as const,
    description: "Complete wedding planning.",
    image: mockImage,
    imageAlt: "Wedding Planning",
    features: ["Wedding & Engagement planning"],
    gallery: [],
    ctaLabel: "Enquire for Wedding",
    ctaHref: "/contact",
    order: 1,
  },
  {
    title: "Corporate",
    slug: "corporate",
    icon: "briefcase" as const,
    description: "Professional corporate event planning.",
    image: mockImage,
    imageAlt: "Corporate Planning",
    features: ["Conference planning & coordination"],
    gallery: [],
    ctaLabel: "Corporate Solutions",
    ctaHref: "/contact",
    order: 2,
  },
];

describe("ServiceCatalog", () => {
  it("renders every service as a card, in order", () => {
    render(<ServiceCatalog services={services} />);

    const headings = screen
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);
    expect(headings).toEqual(["Weddings", "Corporate"]);
  });

  it("links each card to its own detail page", () => {
    render(<ServiceCatalog services={services} />);

    const detailHrefs = screen
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"))
      .filter((href) => href?.startsWith("/services/"));
    expect(detailHrefs).toEqual(["/services/weddings", "/services/corporate"]);
  });

  it("marks only the first card's image priority (genuine LCP candidate)", () => {
    const { container } = render(<ServiceCatalog services={services} />);

    const images = container.querySelectorAll("img");
    // next/image's `priority` disables lazy-loading — verified via
    // `loading`, since `fetchpriority` isn't reliably reflected in jsdom.
    expect(images[0]).not.toHaveAttribute("loading", "lazy");
    expect(images[1]).toHaveAttribute("loading", "lazy");
  });

  it("renders nothing when there are zero services", () => {
    const { container } = render(<ServiceCatalog services={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("has no axe violations", async () => {
    const { container } = render(<ServiceCatalog services={services} />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
