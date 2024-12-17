// App.test.tsx
import { mockAuth, render, screen, waitFor } from "../utils/test-utils";
import App from "../App";
import { describe, test, expect } from "vitest";

describe("App component", () => {
  test("renders Home component on default route", () => {
    render(<App />, { route: "/" });
    // const image = screen.getByRole("img", {
    //   name: /hrtm consulting logo/i,
    // });
    // expect(image).toBeInTheDocument();
  });

  test("renders the Signin page on '/login' route", () => {
    render(<App />, { route: "/login", useMemoryRouter: true });
    const formHeader = screen.getByText(/Boarding/i);
    expect(formHeader).toBeInTheDocument();
  });

  test("renders the Signup page on /signup route", () => {
    render(<App />, { route: "/signup", useMemoryRouter: true });
    const formHeader = screen.getByText(/Create an account/i);
    expect(formHeader).toBeInTheDocument();
  });

  test("renders 404 page on non-existent route", () => {
    render(<App />, { route: "/non-existent", useMemoryRouter: true });
    const errorHeader = screen.getByText(/404 page not found/i);
    expect(errorHeader).toBeInTheDocument();
  });
});

describe("Protected Routes", () => {
  test("redirects to login if user is not authenticated", async () => {
    render(<App />, {
      route: "/boarding",
      useMemoryRouter: true,
    });

    await waitFor(() => {
      expect(screen.getByText(/Boarding/i)).toBeInTheDocument();
    });
  });

  test("renders Welcome page if user is authenticated", async () => {
    mockAuth("exampleToken"); // Mock a valid auth token
    render(<App />, { route: "/boarding", useMemoryRouter: true });
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });
});
