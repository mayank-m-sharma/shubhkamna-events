import { renderHook } from "@testing-library/react";

import { useFocusOnRouteChange } from "./useFocusOnRouteChange";

const mockUsePathname = jest.fn<string, []>();

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

function setup(initialPathname: string): {
  ref: { current: HTMLElement };
  rerender: () => void;
} {
  mockUsePathname.mockReturnValue(initialPathname);

  const element = document.createElement("main");
  element.tabIndex = -1;
  document.body.appendChild(element);
  const ref = { current: element };

  const { rerender } = renderHook(() => useFocusOnRouteChange(ref));

  return { ref, rerender };
}

describe("useFocusOnRouteChange", () => {
  it("does not steal focus on the initial render", () => {
    const { ref } = setup("/");

    expect(ref.current).not.toHaveFocus();
  });

  it("moves focus to the target element when the pathname changes", () => {
    const { ref, rerender } = setup("/");

    mockUsePathname.mockReturnValue("/services");
    rerender();

    expect(ref.current).toHaveFocus();
  });

  it("does not move focus again on a re-render with the same pathname", () => {
    const { ref, rerender } = setup("/");
    ref.current.blur();

    rerender();

    expect(ref.current).not.toHaveFocus();
  });
});
