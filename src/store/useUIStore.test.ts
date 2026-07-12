import { act, renderHook } from "@testing-library/react";

import { useUIStore } from "./useUIStore";

describe("useUIStore", () => {
  beforeEach(() => {
    useUIStore.setState({ isMobileNavOpen: false });
  });

  it("starts with the mobile nav closed", () => {
    const { result } = renderHook(() => useUIStore());

    expect(result.current.isMobileNavOpen).toBe(false);
  });

  it("toggles the mobile nav open state", () => {
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.toggleMobileNav();
    });
    expect(result.current.isMobileNavOpen).toBe(true);

    act(() => {
      result.current.toggleMobileNav();
    });
    expect(result.current.isMobileNavOpen).toBe(false);
  });

  it("closes the mobile nav regardless of current state", () => {
    const { result } = renderHook(() => useUIStore());

    act(() => {
      result.current.toggleMobileNav();
      result.current.closeMobileNav();
    });

    expect(result.current.isMobileNavOpen).toBe(false);
  });
});
