import { act, renderHook } from "@testing-library/react";

import { useGalleryLightbox } from "./useGalleryLightbox";

describe("useGalleryLightbox", () => {
  it("starts with no active image", () => {
    const { result } = renderHook(() => useGalleryLightbox(5));

    expect(result.current.activeIndex).toBeNull();
  });

  it("opens the lightbox at the given index", () => {
    const { result } = renderHook(() => useGalleryLightbox(5));

    act(() => result.current.openLightbox(2));

    expect(result.current.activeIndex).toBe(2);
  });

  it("closes the lightbox", () => {
    const { result } = renderHook(() => useGalleryLightbox(5));

    act(() => result.current.openLightbox(2));
    act(() => result.current.closeLightbox());

    expect(result.current.activeIndex).toBeNull();
  });

  it("navigates forward and backward with wraparound", () => {
    const { result } = renderHook(() => useGalleryLightbox(3));

    act(() => result.current.openLightbox(0));
    act(() => result.current.handleNavigate(-1));
    expect(result.current.activeIndex).toBe(2);

    act(() => result.current.handleNavigate(1));
    act(() => result.current.handleNavigate(1));
    expect(result.current.activeIndex).toBe(1);
  });

  it("does nothing when navigating while closed", () => {
    const { result } = renderHook(() => useGalleryLightbox(3));

    act(() => result.current.handleNavigate(1));

    expect(result.current.activeIndex).toBeNull();
  });

  it("records the return-focus target from the trigger that opened it", () => {
    const { result } = renderHook(() => useGalleryLightbox(3));
    const button = document.createElement("button");

    act(() => result.current.setTriggerRef(1, button));
    act(() => result.current.openLightbox(1));

    expect(result.current.returnFocusRef.current).toBe(button);
  });
});
