import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import type { SanityImage } from "@/lib/validations/image.schema";

import { GalleryMasonry } from "./GalleryMasonry";

jest.mock("@/lib/sanity/image", () => ({
  urlFor: jest.fn(() => ({
    auto: jest.fn().mockReturnThis(),
    url: jest.fn(
      () => "https://cdn.sanity.io/images/proj/ds/mock-800x1000.jpg",
    ),
  })),
}));

function mockImage(id: string): SanityImage {
  return {
    asset: {
      _id: id,
      url: `https://cdn.sanity.io/images/proj/ds/${id}.jpg`,
      metadata: { dimensions: { width: 800, height: 1000 } },
    },
    hotspot: undefined,
  };
}

const images = [
  {
    image: mockImage("image-1"),
    alt: "Luxury Reception Decor",
    caption: "Luxury Reception Decor",
    category: "Indore | 500+ Guests",
  },
  {
    image: mockImage("image-2"),
    alt: "Corporate Gala",
    caption: "Corporate Gala",
    category: "Product Launch",
  },
];

describe("GalleryMasonry", () => {
  it("renders every image as a trigger button", () => {
    render(<GalleryMasonry images={images} />);

    expect(
      screen.getByRole("button", { name: /Luxury Reception Decor/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Corporate Gala/ }),
    ).toBeInTheDocument();
  });

  it("opens the lightbox with the clicked image on click", async () => {
    const user = userEvent.setup();
    render(<GalleryMasonry images={images} />);

    await user.click(screen.getByRole("button", { name: /Corporate Gala/ }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toHaveAccessibleName(/Corporate Gala/);
  });

  it("closes the lightbox and returns focus to the trigger on Escape", async () => {
    const user = userEvent.setup();
    render(<GalleryMasonry images={images} />);

    const trigger = screen.getByRole("button", {
      name: /Luxury Reception Decor/,
    });
    await user.click(trigger);
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("renders nothing when there are zero images", () => {
    const { container } = render(<GalleryMasonry images={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("has no axe violations, closed or with the lightbox open", async () => {
    const user = userEvent.setup();
    const { container } = render(<GalleryMasonry images={images} />);

    expect(await axe(container)).toHaveNoViolations();

    await user.click(screen.getByRole("button", { name: /Corporate Gala/ }));

    expect(await axe(container)).toHaveNoViolations();
  });
});
