import { render, screen } from "../utils/test-utils";
import App from "../App";
import { describe, test, expect, beforeEach, vi } from "vitest";

describe("App component", () => {
  beforeEach(() => {
    // Mock scrollTo
    document.documentElement.scrollTo = vi.fn();

    // Mock ResizeObserver
    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });

  test("renders Home component on default route", () => {
    render(<App />, { route: "/" });
    expect(screen.getAllByText(/The Writer Co/i)).toBeTruthy();
  });
});
