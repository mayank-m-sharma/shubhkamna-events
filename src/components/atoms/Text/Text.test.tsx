import { render, screen } from "@testing-library/react";

import { Text } from "./Text";

describe("Text", () => {
  it("renders the children it is given", () => {
    render(<Text>Plain paragraph copy</Text>);

    expect(screen.getByText("Plain paragraph copy")).toBeInTheDocument();
  });

  it("renders as a paragraph element", () => {
    render(<Text>Copy</Text>);

    expect(screen.getByText("Copy").tagName).toBe("P");
  });
});
