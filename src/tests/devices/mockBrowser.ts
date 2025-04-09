import { vi } from "vitest";

export const mockBrowser = () => {
  // Mock scrollTo
  document.documentElement.scrollTo = vi.fn();

  // Mock ResizeObserver
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
};
