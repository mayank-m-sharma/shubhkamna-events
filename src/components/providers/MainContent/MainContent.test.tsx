import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { MainContent } from "./MainContent";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("MainContent", () => {
  it("renders its children inside a main landmark with the skip-link target id", () => {
    render(
      <MainContent>
        <p>Page content</p>
      </MainContent>,
    );

    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "main-content");
    expect(screen.getByText("Page content")).toBeInTheDocument();
  });

  it("is programmatically focusable so route changes can move focus to it", () => {
    render(
      <MainContent>
        <p>Page content</p>
      </MainContent>,
    );

    expect(screen.getByRole("main")).toHaveAttribute("tabindex", "-1");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <MainContent>
        <p>Page content</p>
      </MainContent>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
