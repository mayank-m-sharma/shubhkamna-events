import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { ServiceDetail } from "./ServiceDetail";

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
  features: [
    "Wedding & Engagement planning",
    "Royal Theme Decor Design",
    "Destination Wedding planning",
  ],
  ctaLabel: "Enquire for Wedding",
  ctaHref: "/contact",
};

describe("ServiceDetail", () => {
  it("renders the title as the page's h1", () => {
    render(<ServiceDetail {...baseProps} />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Weddings" }),
    ).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<ServiceDetail {...baseProps} />);

    expect(
      screen.getByText(/Complete wedding planning and engagement/),
    ).toBeInTheDocument();
  });

  it("renders every feature as a list item", () => {
    render(<ServiceDetail {...baseProps} />);

    const list = screen.getByRole("list", { name: /features/i });
    baseProps.features.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
    expect(list.querySelectorAll("li")).toHaveLength(baseProps.features.length);
  });

  it("renders the main image with its alt text", () => {
    render(<ServiceDetail {...baseProps} />);

    expect(
      screen.getByAltText("Wedding Planning by Shubhkamna Events"),
    ).toBeInTheDocument();
  });

  it("renders the CTA link", () => {
    render(<ServiceDetail {...baseProps} />);

    expect(
      screen.getByRole("link", { name: "Enquire for Wedding" }),
    ).toHaveAttribute("href", "/contact");
  });

  it("renders a gallery only when images are given", () => {
    const { rerender } = render(<ServiceDetail {...baseProps} />);
    expect(screen.queryAllByRole("button")).toHaveLength(0);

    rerender(
      <ServiceDetail
        {...baseProps}
        gallery={[
          {
            image: mockImage,
            alt: "Wedding decor detail",
            caption: undefined,
            category: undefined,
          },
        ]}
      />,
    );
    expect(screen.getByAltText("Wedding decor detail")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <ServiceDetail
        {...baseProps}
        gallery={[
          {
            image: mockImage,
            alt: "Wedding decor detail",
            caption: undefined,
            category: undefined,
          },
        ]}
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
