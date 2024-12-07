import { render, screen } from "@testing-library/react";
import NoPage from ".";
import { describe, it, expect } from "vitest";

describe("NoPage component", () => {
  it("renders without crashing", () => {
    render(<NoPage />);
    expect(screen.getByText(/404 Page Not Found/i)).toBeInTheDocument();
  });
});
