import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";

import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

function Probe(): ReactNode {
  const prefersReducedMotion = usePrefersReducedMotion();

  return <span>{prefersReducedMotion ? "reduced" : "no-preference"}</span>;
}

function mockMatchMedia(matches: boolean): void {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
}

describe("usePrefersReducedMotion", () => {
  it("reflects the media query's initial value once mounted", () => {
    mockMatchMedia(true);

    render(<Probe />);

    expect(screen.getByText("reduced")).toBeInTheDocument();
  });

  it("defaults to no preference when the query doesn't match", () => {
    mockMatchMedia(false);

    render(<Probe />);

    expect(screen.getByText("no-preference")).toBeInTheDocument();
  });
});
