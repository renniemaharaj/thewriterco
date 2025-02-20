import { render, screen } from "../utils/test-utils";
import App from "../App";
import { describe, test, expect } from "vitest";

describe("App component", () => {
  test("renders Home component on default route", () => {
    render(<App />, { route: "/" });
    expect(screen.getByText(/TheWriterCo/i)).toBeInTheDocument();
  });
});
