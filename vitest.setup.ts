import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { setupServer } from "msw/node";
import { beforeAll, afterEach, afterAll, beforeEach } from "vitest";
import { handlers } from "./src/mocks/handlers";
import { mockAuthEmpty } from "./src/utils/test-utils";

const server = setupServer(...handlers);

beforeEach(() => mockAuthEmpty());
beforeAll(() => server.listen());
afterEach(() => {
  // Reset any runtime request handlers we may add during the tests.
  server.resetHandlers();
  mockAuthEmpty();
  cleanup();
});

// Disable API mocking after the tests are done.
afterAll(() => server.close());

server.events.on("request:start", ({ request }) => {
  console.log("MSW intercepted:", request.method, request.url);
});
