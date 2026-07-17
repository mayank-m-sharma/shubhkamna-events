import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { createRef } from "react";

import { GalleryLightbox } from "./GalleryLightbox";

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

const images = [
  {
    image: mockImage,
    alt: "Luxury Reception Decor",
    caption: "Luxury Reception Decor",
    category: "Indore | 500+ Guests",
  },
  {
    image: mockImage,
    alt: "Corporate Gala",
    caption: "Corporate Gala",
    category: "Product Launch",
  },
];

describe("GalleryLightbox", () => {
  it("renders the image at the given index with its caption/category", () => {
    render(
      <GalleryLightbox
        images={images}
        index={1}
        onClose={jest.fn()}
        onNavigate={jest.fn()}
        returnFocusRef={createRef()}
      />,
    );

    expect(screen.getByAltText("Corporate Gala")).toBeInTheDocument();
    expect(screen.getByText("Product Launch")).toBeInTheDocument();
    expect(
      screen.getByRole("dialog", { name: "Corporate Gala" }),
    ).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(
      <GalleryLightbox
        images={images}
        index={0}
        onClose={onClose}
        onNavigate={jest.fn()}
        returnFocusRef={createRef()}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(onClose).toHaveBeenCalled();
  });

  it("calls onNavigate with the correct direction from prev/next buttons", async () => {
    const user = userEvent.setup();
    const onNavigate = jest.fn();
    render(
      <GalleryLightbox
        images={images}
        index={0}
        onClose={jest.fn()}
        onNavigate={onNavigate}
        returnFocusRef={createRef()}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Next image" }));
    expect(onNavigate).toHaveBeenCalledWith(1);

    await user.click(screen.getByRole("button", { name: "Previous image" }));
    expect(onNavigate).toHaveBeenCalledWith(-1);
  });

  it("navigates with the ArrowLeft/ArrowRight keys", async () => {
    const user = userEvent.setup();
    const onNavigate = jest.fn();
    render(
      <GalleryLightbox
        images={images}
        index={0}
        onClose={jest.fn()}
        onNavigate={onNavigate}
        returnFocusRef={createRef()}
      />,
    );

    await user.keyboard("{ArrowRight}");
    expect(onNavigate).toHaveBeenCalledWith(1);

    await user.keyboard("{ArrowLeft}");
    expect(onNavigate).toHaveBeenCalledWith(-1);
  });

  it("hides prev/next buttons when there is only one image", () => {
    render(
      <GalleryLightbox
        images={[images[0]!]}
        index={0}
        onClose={jest.fn()}
        onNavigate={jest.fn()}
        returnFocusRef={createRef()}
      />,
    );

    expect(
      screen.queryByRole("button", { name: "Next image" }),
    ).not.toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <GalleryLightbox
        images={images}
        index={0}
        onClose={jest.fn()}
        onNavigate={jest.fn()}
        returnFocusRef={createRef()}
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
