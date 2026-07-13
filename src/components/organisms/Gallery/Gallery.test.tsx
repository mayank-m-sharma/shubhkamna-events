import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { Gallery } from "./Gallery";

jest.mock("@/lib/sanity/image", () => ({
  urlFor: jest.fn(() => ({
    auto: jest.fn().mockReturnThis(),
    url: jest.fn(() => "https://cdn.sanity.io/images/proj/ds/mock-800x600.jpg"),
  })),
}));

function mockImage(id: string): {
  asset: {
    _id: string;
    url: string;
    metadata: { dimensions: { width: number; height: number } };
  };
  hotspot: undefined;
} {
  return {
    asset: {
      _id: id,
      url: `https://cdn.sanity.io/images/proj/ds/${id}.webp`,
      metadata: { dimensions: { width: 800, height: 600 } },
    },
    hotspot: undefined,
  };
}

const images = [
  {
    image: mockImage("v5"),
    alt: "Shubhkamna Events wedding decor",
    caption: "Grand Wedding Decor",
    category: "Wedding & Engagement",
  },
  {
    image: mockImage("v6"),
    alt: "Shubhkamna Events corporate event",
    caption: "Corporate Gala",
    category: "Indore Business Center",
  },
];

describe("Gallery", () => {
  it("renders the CMS heading", () => {
    render(<Gallery heading="Capturing Every Moment" images={[]} />);

    expect(
      screen.getByRole("heading", { name: "Capturing Every Moment" }),
    ).toBeInTheDocument();
  });

  it("renders no grid items when there are zero images", () => {
    render(<Gallery images={[]} />);

    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("renders a trigger button per image with its alt text", () => {
    render(<Gallery images={images} />);

    expect(
      screen.getByAltText("Shubhkamna Events wedding decor"),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("Shubhkamna Events corporate event"),
    ).toBeInTheDocument();
  });

  it("renders caption and category text without requiring hover (avoids the reference site's hover-only anti-pattern)", () => {
    render(<Gallery images={images} />);

    expect(screen.getByText("Grand Wedding Decor")).toBeVisible();
    expect(screen.getByText("Wedding & Engagement")).toBeVisible();
  });

  it("renders the view-all link only when both its label and href are given", () => {
    const { rerender } = render(
      <Gallery
        images={[]}
        viewAllLabel="See More Projects"
        viewAllHref="/gallery"
      />,
    );
    expect(
      screen.getByRole("link", { name: "See More Projects" }),
    ).toHaveAttribute("href", "/gallery");

    rerender(<Gallery images={[]} viewAllLabel="See More Projects" />);
    expect(
      screen.queryByRole("link", { name: "See More Projects" }),
    ).not.toBeInTheDocument();
  });

  it("does not render a dialog until a thumbnail is activated", () => {
    render(<Gallery images={images} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens the lightbox on the clicked image when a thumbnail is activated", async () => {
    const user = userEvent.setup();
    render(<Gallery images={images} />);

    await user.click(screen.getByAltText("Shubhkamna Events corporate event"));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(
      screen.getAllByAltText("Shubhkamna Events corporate event"),
    ).toHaveLength(2);
  });

  it("closes the lightbox on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<Gallery images={images} />);
    const trigger = screen
      .getByAltText("Shubhkamna Events wedding decor")
      .closest("button") as HTMLButtonElement;

    await user.click(trigger);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("navigates to the next image with ArrowRight", async () => {
    const user = userEvent.setup();
    render(<Gallery images={images} />);

    await user.click(screen.getByAltText("Shubhkamna Events wedding decor"));
    await user.keyboard("{ArrowRight}");

    expect(
      screen.getAllByAltText("Shubhkamna Events corporate event"),
    ).toHaveLength(2);
  });

  it("wraps to the last image with ArrowLeft from the first image", async () => {
    const user = userEvent.setup();
    render(<Gallery images={images} />);

    await user.click(screen.getByAltText("Shubhkamna Events wedding decor"));
    await user.keyboard("{ArrowLeft}");

    expect(
      screen.getAllByAltText("Shubhkamna Events corporate event"),
    ).toHaveLength(2);
  });

  it("has no axe violations with the lightbox closed or open", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Gallery
        heading="Capturing Every Moment"
        intro="Take a look at the stunning events we have brought to life."
        viewAllLabel="See More Projects"
        viewAllHref="/gallery"
        images={images}
      />,
    );

    expect(await axe(container)).toHaveNoViolations();

    await user.click(screen.getByAltText("Shubhkamna Events wedding decor"));

    expect(await axe(container)).toHaveNoViolations();
  });
});
