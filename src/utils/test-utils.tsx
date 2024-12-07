/* eslint-disable react-refresh/only-export-components */
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Theme } from "@radix-ui/themes";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { store } from "../app/store";
import { ReactNode } from "react";
import { vi } from "vitest";
import { logOut, setAccessToken } from "../app/api/auth/authSlice";

export const mockAuth = (token = "exampleToken") => {
  store.dispatch(setAccessToken(token));
};
export const mockAuthEmpty = () => {
  store.dispatch(logOut());
};

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

// Mock MSAL instance
const msalInstance = new PublicClientApplication({
  auth: {
    clientId: "TEST_CLIENT_ID",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "http://localhost:3000",
  },
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
        <MsalProvider instance={msalInstance}>
          <Theme appearance="light" accentColor="indigo" grayColor="sand">
            {ui}
          </Theme>
        </MsalProvider>
      </Router>
    </Provider>,
  );
};

export * from "@testing-library/react";
export { customRender as render };
