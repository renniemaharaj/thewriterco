import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";
import { mockBrowser } from "./src/tests/devices/mockBrowser";

const server = setupServer();

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock browser ONCE globally
beforeAll(() => {
  mockBrowser();
  server.listen();
});

// Mock auth before EACH test (if needed)
beforeEach(() => {});

// Cleanup after EACH test
afterEach(() => {
  server.resetHandlers();
  cleanup();
  localStorage.clear();
});

// Fully shutdown MSW after all tests
afterAll(() => {
  server.close();
});
