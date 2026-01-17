import { Theme } from "@radix-ui/themes";
import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { store } from "../app/store";

Object.defineProperty(window, "matchMedia", {
  writable: false,
  value: (query: string) => ({
    matches: query === "(prefers-color-scheme: light)",
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    // addListener: vi.fn(), // Deprecated. Don't use this. Uncomment if required for mocking
    // removeListener: vi.fn(), // Deprecated. Don't use this. Don't use this. Uncomment if required for mocking
    dispatchEvent: vi.fn(),
  }),
});

Object.defineProperty(window, "IntersectionObserver", {
  writable: false,
  value: vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })),
});

interface CustomRenderOptions {
  route?: string;
  useMemoryRouter?: boolean;
}

const customRender = (
  ui: ReactNode,
  { route = "/", useMemoryRouter = false }: CustomRenderOptions = {},
) => {
  const Router = useMemoryRouter ? MemoryRouter : BrowserRouter;
  const initialEntries = useMemoryRouter ? [route] : undefined;

  return render(
    <Provider store={store}>
      <Router {...(useMemoryRouter && { initialEntries })}>
        <Theme appearance="light" accentColor="indigo" grayColor="sand">
          {ui}
        </Theme>
      </Router>
    </Provider>,
  );
};

export * from "@testing-library/react";
export { customRender as render };
