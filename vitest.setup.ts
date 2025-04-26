import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { setupServer } from "msw/node";
import { beforeAll, afterEach, afterAll, beforeEach } from "vitest";
import { handlers } from "./src/pkg/hooks/mocks/handlers";
import { mockAuthEmpty } from "./src/utils/test-utils";
import { mockBrowser } from "./src/tests/devices/mockBrowser";

const server = setupServer(...handlers);

// Mock browser ONCE globally
beforeAll(() => {
  mockBrowser();
  server.listen();
});

// Mock auth before EACH test (if needed)
beforeEach(() => {
  mockAuthEmpty();
});

// Cleanup after EACH test
afterEach(() => {
  server.resetHandlers();
  cleanup();
  mockAuthEmpty();
});

// Fully shutdown MSW after all tests
afterAll(() => {
  server.close();
});

// Optional: Log intercepted requests
server.events.on("request:start", ({ request }) => {
  console.log("MSW intercepted:", request.method, request.url);
});
