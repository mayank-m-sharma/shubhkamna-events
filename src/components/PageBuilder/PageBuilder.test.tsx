import { render, screen } from "@testing-library/react";

import type { HomePageSection } from "@/types/cms";

import { PageBuilder } from "./PageBuilder";

jest.mock("@/components/organisms/Hero", () => ({
  Hero: (props: { headline: string; reviewRating?: number }) => (
    <div data-testid="hero">
      {props.headline}:{props.reviewRating}
    </div>
  ),
}));
jest.mock("@/components/organisms/Services", () => ({
  Services: () => <div data-testid="services" />,
}));
jest.mock("@/components/organisms/Gallery", () => ({
  Gallery: () => <div data-testid="gallery" />,
}));
jest.mock("@/components/organisms/Testimonials", () => ({
  Testimonials: (props: { reviewUrl?: string }) => (
    <div data-testid="testimonials">{props.reviewUrl}</div>
  ),
}));
jest.mock("@/components/organisms/ContactSection", () => ({
  ContactSection: (props: { phone?: string }) => (
    <div data-testid="contactSection">{props.phone}</div>
  ),
}));

const extras = {
  reviewRating: 5,
  reviewCount: 50,
  reviewUrl: "https://example.com/reviews",
  organizationPhone: "+919754455007",
  whatsappNumber: "+919754455007",
};

const heroSection: HomePageSection = {
  _type: "heroSection",
  headline: "Hi",
  subhead: undefined,
  backgroundImage: undefined,
  backgroundImageAlt: undefined,
  backgroundVideoUrl: undefined,
  primaryCtaLabel: "Go",
  primaryCtaHref: "/contact",
  secondaryCtaLabel: undefined,
  secondaryCtaHref: undefined,
};

const servicesSection: HomePageSection = {
  _type: "servicesSection",
  heading: undefined,
  intro: undefined,
  viewAllLabel: undefined,
  viewAllHref: undefined,
  items: [],
};

const gallerySection: HomePageSection = {
  _type: "gallerySection",
  heading: undefined,
  intro: undefined,
  viewAllLabel: undefined,
  viewAllHref: undefined,
  images: [],
};

const testimonialsSection: HomePageSection = {
  _type: "testimonialsSection",
  heading: undefined,
  intro: undefined,
  items: [],
};

const contactSection: HomePageSection = {
  _type: "contactSection",
  variant: "banner",
  heading: undefined,
  intro: undefined,
  successMessage: undefined,
};

describe("PageBuilder", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders each registered section via its organism, in order", () => {
    const { container } = render(
      <PageBuilder
        sections={[
          heroSection,
          servicesSection,
          gallerySection,
          testimonialsSection,
          contactSection,
        ]}
        extras={extras}
      />,
    );

    const ids = Array.from(container.querySelectorAll("[data-testid]")).map(
      (el) => el.getAttribute("data-testid"),
    );
    expect(ids).toEqual([
      "hero",
      "services",
      "gallery",
      "testimonials",
      "contactSection",
    ]);
  });

  it("passes siteSettings-sourced extras through to the sections that need them", () => {
    render(
      <PageBuilder
        sections={[heroSection, testimonialsSection, contactSection]}
        extras={extras}
      />,
    );

    expect(screen.getByTestId("hero")).toHaveTextContent("Hi:5");
    expect(screen.getByTestId("testimonials")).toHaveTextContent(
      "https://example.com/reviews",
    );
    expect(screen.getByTestId("contactSection")).toHaveTextContent(
      "+919754455007",
    );
  });

  it("renders nothing for zero sections, without crashing", () => {
    const { container } = render(<PageBuilder sections={[]} extras={extras} />);

    expect(container.querySelectorAll("[data-testid]")).toHaveLength(0);
  });

  it("throws for an unregistered section type outside production", () => {
    const originalEnv = process.env.NODE_ENV;
    jest.replaceProperty(process, "env", { ...process.env, NODE_ENV: "test" });

    expect(() =>
      render(
        <PageBuilder
          sections={[{ _type: "notASection" } as unknown as HomePageSection]}
          extras={extras}
        />,
      ),
    ).toThrow(/notASection/);

    jest.replaceProperty(process, "env", {
      ...process.env,
      NODE_ENV: originalEnv,
    });
  });

  it("skips an unregistered section type silently in production", () => {
    jest.replaceProperty(process, "env", {
      ...process.env,
      NODE_ENV: "production",
    });
    jest.spyOn(console, "error").mockImplementation(() => {});

    const { container } = render(
      <PageBuilder
        sections={[
          { _type: "notASection" } as unknown as HomePageSection,
          servicesSection,
        ]}
        extras={extras}
      />,
    );

    expect(container.querySelectorAll("[data-testid]")).toHaveLength(1);
    expect(screen.getByTestId("services")).toBeInTheDocument();
  });
});
