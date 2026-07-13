import { render, screen } from "@testing-library/react";

import { Image } from "./Image";

jest.mock("@/lib/sanity/image", () => ({
  urlFor: jest.fn(() => ({
    auto: jest.fn().mockReturnThis(),
    url: jest.fn(() => "https://cdn.sanity.io/images/proj/ds/mock-800x600.jpg"),
  })),
}));

const mockImage = {
  asset: {
    _id: "image-abc-800x600-jpg",
    url: "https://cdn.sanity.io/images/proj/ds/abc-800x600.jpg",
    metadata: { dimensions: { width: 800, height: 600 } },
  },
  hotspot: undefined,
};

describe("Image", () => {
  it("renders with the required alt text", () => {
    render(<Image image={mockImage} alt="A decorated wedding stage" />);

    expect(
      screen.getByAltText("A decorated wedding stage"),
    ).toBeInTheDocument();
  });

  it("uses the natural dimensions from Sanity's image metadata", () => {
    render(<Image image={mockImage} alt="Alt text" />);

    const img = screen.getByAltText("Alt text");
    expect(img).toHaveAttribute("width", "800");
    expect(img).toHaveAttribute("height", "600");
  });

  it("omits width/height and fills its parent when fill is set", () => {
    render(<Image image={mockImage} alt="Alt text" fill />);

    const img = screen.getByAltText("Alt text");
    expect(img).not.toHaveAttribute("width");
    expect(img).not.toHaveAttribute("height");
  });

  it("passes priority through for LCP candidates", () => {
    render(<Image image={mockImage} alt="Alt text" priority />);

    // next/image drops the `loading` attribute entirely when priority is set.
    expect(screen.getByAltText("Alt text")).not.toHaveAttribute("loading");
  });
});
