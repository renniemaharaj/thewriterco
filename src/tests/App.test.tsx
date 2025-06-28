import { render, screen } from "../utils/test-utils";
import App from "../App";
import { describe, test, expect } from "vitest";
// import { act } from "react";
// import { useElevenLabs } from "../pkg/hooks/data/useElevenLabs";

// Utility: Assert that a string matches all provided regex patterns
const assertTextMatchesAll = (text: string, patterns: RegExp[]) => {
  patterns.forEach((pattern) => {
    expect(text).toMatch(pattern);
  });
};

// Utility: Fetch text content from a testId
const getByTestIdText = (testId: string): string => {
  const element = screen.getByTestId(testId);
  return element.textContent ?? "";
};

// Utility: Shortcut to assert a testId’s content matches all patterns
const assertElementContainsAllText = (testId: string, patterns: RegExp[]) => {
  const text = getByTestIdText(testId);
  assertTextMatchesAll(text, patterns);
};

describe("App component", () => {
  test("renders root page with company name", () => {
    render(<App />, { route: "/" });
    const matches = screen.getAllByText(/The Writer Company/i);
    expect(matches.length).toBeGreaterThan(0);
  });

  test("displays welcome message in hero section", () => {
    render(<App />, { route: "/" });
    assertElementContainsAllText("heroElement", [/Welcome/]);
  });

  test("header contains all expected navigation links", () => {
    render(<App />, { route: "/" });
    assertElementContainsAllText("header", [
      /TheWriterCo/,
      /Writer/,
      /KJV/,
      /Read/,
    ]);
  });
});
