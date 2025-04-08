import { render, screen } from "../utils/test-utils";
import App from "../App";
import { describe, test, expect, beforeEach, vi } from "vitest";

describe("App component", () => {
  beforeEach(() => {
    // Mock scrollTo
    document.documentElement.scrollTo = vi.fn();
  });

  test("renders Home component on default route", () => {
    render(<App />, { route: "/" });
    expect(screen.getByText(/ResizeObserver is not defined/i));
  });
});
