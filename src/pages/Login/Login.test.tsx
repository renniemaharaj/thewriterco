import { fireEvent, render, screen, waitFor } from "../../utils/test-utils";
import userEvent from "@testing-library/user-event";
import Login from ".";
import { describe, test, expect } from "vitest";
import { useNavigate } from "react-router-dom";
import { vi } from "vitest";
import { ReactNode } from "react";
import { store } from "../../app/store";
import { ThemeProvider } from "../../components/context/ThemeProvider";

type Props = {
  children: ReactNode;
};
vi.mock("../../components/context/useThemeContext.tsx", () => ({
  useThemeContext: () => ({ theme: "light" }), // Replace "light" with "dark" for dark theme
}));

vi.mock("../../components/RequireAuth", () => ({ children }: Props) => (
  <ThemeProvider>{children}</ThemeProvider>
));
vi.mock("../../components/PersistLogin", () => ({ children }: Props) => (
  <ThemeProvider>{children}</ThemeProvider>
));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom"); // Import original module
  return {
    ...actual,
    useNavigate: vi.fn(), // Mock only useNavigate
  };
});

describe("Login component", () => {
  test("renders without crashing", () => {
    render(<Login />);

    const emailInput = screen.getByRole("textbox");
    const passwordInput = screen.getByPlaceholderText(/enter password/i);
    const submitButton = screen.getByRole("button", {
      name: "Sign in",
    });
    const staySignedIn = screen.getByText(/stay signed in\?/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(staySignedIn).toBeInTheDocument();
  });

  test("should render required fields", () => {
    render(<Login />);
    const emailInput = screen.getByRole("textbox");
    const passwordInput = screen.getByPlaceholderText(/enter password/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test("should show validation errors on empty fields", async () => {
    render(<Login />);
    const emailInput = screen.getByRole("textbox");
    const passwordInput = screen.getByPlaceholderText(/enter password/i);

    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      const requiredErrors = screen.getAllByText("Required");
      expect(requiredErrors).toHaveLength(2);
    });
  });

  test("should show validation error on invalid email", async () => {
    render(<Login />);
    const emailInput = screen.getByRole("textbox");

    await userEvent.type(emailInput, "invalid_email");

    fireEvent.blur(emailInput);

    await waitFor(() => {
      const emailError = screen.getByText("Invalid email address");
      expect(emailError).toBeInTheDocument();
    });
  });

  test("should submit valid login details", async () => {
    // Mocked useNavigate spy
    const navigate = vi.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    render(<Login />);

    const emailInput = screen.getByRole("textbox");
    const passwordInput = screen.getByPlaceholderText(/enter password/i);
    const submitButton = screen.getByRole("button", {
      name: "Sign in",
    });

    await userEvent.type(emailInput, "johndoe@email.com");
    await userEvent.type(passwordInput, "password");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/welcome");
      expect(store.getState().auth.accessToken).toBe("exampleToken");
    });
  });

  test("should show error for invalid login details", async () => {
    render(<Login />);

    const emailInput = screen.getByRole("textbox");
    const passwordInput = screen.getByPlaceholderText(/enter password/i);
    const submitButton = screen.getByRole("button", {
      name: "Sign in",
    });

    await userEvent.type(emailInput, "invalidemail@email.com");
    await userEvent.type(passwordInput, "password");
    await userEvent.click(submitButton);

    const invalidLoginError = screen.getByText(/Please try again./i);
    expect(invalidLoginError).toBeInTheDocument();
  });
});

test("sets auth state after successful login", async () => {
  render(<Login />);

  const emailInput = screen.getByRole("textbox");
  const passwordInput = screen.getByPlaceholderText(/enter password/i);
  const submitButton = screen.getByRole("button", {
    name: "Sign in",
  });

  await userEvent.type(emailInput, "johndoe@email.com");
  await userEvent.type(passwordInput, "password");
  await userEvent.click(submitButton);

  await waitFor(() => {
    const state = store.getState().auth;
    expect(state.user?.userName).toBe("john");
    expect(state.accessToken).toBe("exampleToken");
  });
});
