import { render, screen } from "@testing-library/react";
import Recovery from ".";
import { describe, it, expect } from "vitest";

describe("Recovery component", () => {
  it("renders without crashing", () => {
    render(<Recovery />);
    expect(screen.getByText(/Account recovery/i)).toBeInTheDocument();
  });
});
