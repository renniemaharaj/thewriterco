import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("should render without 404", () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
    expect(container.innerHTML).not.toContain("404");
  });
});
