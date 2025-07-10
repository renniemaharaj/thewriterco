import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { setupServer } from "msw/node";
import { beforeAll, afterEach, afterAll, beforeEach } from "vitest";
import { mockBrowser } from "./src/tests/devices/mockBrowser";

const server = setupServer();

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
});

// Fully shutdown MSW after all tests
afterAll(() => {
  server.close();
});
