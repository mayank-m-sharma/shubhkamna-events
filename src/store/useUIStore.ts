import { create } from "zustand";

interface UIState {
  isMobileNavOpen: boolean;
  toggleMobileNav: () => void;
  closeMobileNav: () => void;
}

// Seeds the client-state pattern for SHU-006 (Header/Nav), the first component
// that will actually consume this store; the coming-soon page has no nav yet.
export const useUIStore = create<UIState>((set) => ({
  isMobileNavOpen: false,
  toggleMobileNav: () =>
    set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),
  closeMobileNav: () => set({ isMobileNavOpen: false }),
}));
