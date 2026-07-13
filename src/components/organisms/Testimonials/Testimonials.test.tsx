import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { Testimonials } from "./Testimonials";

jest.mock("@/lib/sanity/image", () => ({
  urlFor: jest.fn(() => ({
    auto: jest.fn().mockReturnThis(),
    url: jest.fn(() => "https://cdn.sanity.io/images/proj/ds/mock-200x200.jpg"),
  })),
}));

const items = [
  {
    quote:
      "They made every event very creative and in pocket of budget. Beautiful wedding decor.",
    author: "Jyoti Bansal",
    role: "Wedding Client",
    photo: undefined,
    rating: 5,
  },
  {
    quote:
      "Excellent service! Shubhkamna Events planned our daughter's wedding perfectly.",
    author: "Rajesh Khanna",
    role: undefined,
    photo: undefined,
    rating: undefined,
  },
];

describe("Testimonials", () => {
  it("renders the CMS heading", () => {
    render(<Testimonials heading="What Our Clients Think" items={[]} />);

    expect(
      screen.getByRole("heading", { name: "What Our Clients Think" }),
    ).toBeInTheDocument();
  });

  it("renders no testimonial cards when there are zero items", () => {
    const { container } = render(<Testimonials items={[]} />);

    expect(container.querySelectorAll("blockquote")).toHaveLength(0);
  });

  it("renders one testimonial for a single item", () => {
    render(<Testimonials items={[items[0]!]} />);

    expect(screen.getByText(/They made every event/)).toBeInTheDocument();
    expect(screen.getByText("Jyoti Bansal")).toBeInTheDocument();
    expect(screen.getByText("Wedding Client")).toBeInTheDocument();
  });

  it("renders a card per testimonial for many items", () => {
    render(<Testimonials items={items} />);

    expect(screen.getByText("Jyoti Bansal")).toBeInTheDocument();
    expect(screen.getByText("Rajesh Khanna")).toBeInTheDocument();
  });

  it("omits the role when not given", () => {
    render(<Testimonials items={[items[1]!]} />);

    expect(screen.getByText("Rajesh Khanna")).toBeInTheDocument();
    expect(screen.queryByText("Wedding Client")).not.toBeInTheDocument();
  });

  it("renders initials as a fallback avatar when no photo is given", () => {
    render(<Testimonials items={[items[0]!]} />);

    expect(screen.getByText("JB")).toBeInTheDocument();
  });

  it("renders an accessible star rating only when given", () => {
    const { rerender } = render(<Testimonials items={[items[0]!]} />);
    expect(screen.getByLabelText("5 out of 5 stars")).toBeInTheDocument();

    rerender(<Testimonials items={[items[1]!]} />);
    expect(screen.queryByLabelText(/out of 5 stars/)).not.toBeInTheDocument();
  });

  it("renders the read-reviews link only when both reviewUrl and reviewCount are given", () => {
    const { rerender } = render(
      <Testimonials
        items={[]}
        reviewUrl="https://www.google.com/search?q=reviews"
        reviewCount={50}
      />,
    );
    expect(
      screen.getByRole("link", { name: /Read 50\+ Reviews/ }),
    ).toHaveAttribute("href", "https://www.google.com/search?q=reviews");

    rerender(<Testimonials items={[]} reviewCount={50} />);
    expect(
      screen.queryByRole("link", { name: /Read 50\+ Reviews/ }),
    ).not.toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Testimonials
        heading="What Our Clients Think"
        intro="We take pride in our 5-star reputation."
        items={items}
        reviewUrl="https://www.google.com/search?q=reviews"
        reviewCount={50}
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
