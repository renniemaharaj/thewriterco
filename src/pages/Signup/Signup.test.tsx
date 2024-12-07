import { ReactNode } from "react";
import { fireEvent, render, screen, waitFor } from "../../utils/test-utils";
import Signup from "../Signup";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";
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

describe("Signup component", () => {
  test("renders without crashing", async () => {
    render(<Signup />);
    const formHeader = screen.getByText(/Create an account?/i);
    expect(formHeader).toBeInTheDocument();

    const youTabButton = screen.getByRole("tab", {
      name: "You You",
    });
    expect(youTabButton).toBeInTheDocument();

    const userNameInput = screen.getByPlaceholderText("User Name");
    const firstNameInput = screen.getByPlaceholderText("First Name");
    const lastNameInput = screen.getByPlaceholderText("Last Name");
    expect(userNameInput).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();

    const contactTabButton = screen.getByRole("tab", {
      name: "Contact Contact",
    });
    expect(contactTabButton).toBeInTheDocument();

    // Switch tab to Contact
    await userEvent.click(contactTabButton);

    const email = screen.getByPlaceholderText("Email");
    expect(email).toBeInTheDocument();

    const securityTabButton = screen.getByRole("tab", {
      name: "Security Security",
    });
    expect(contactTabButton).toBeInTheDocument();

    // Switch tab to Security
    await userEvent.click(securityTabButton);

    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput =
      screen.getByPlaceholderText("Confirm Password");
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
  });

  test("should show validation errors on empty fields", async () => {
    render(<Signup />);

    const submitButton = screen.getByRole("button", {
      name: "Sign up",
    });

    const userNameInput = screen.getByPlaceholderText("User Name");
    const firstNameInput = screen.getByPlaceholderText("First Name");
    const lastNameInput = screen.getByPlaceholderText("Last Name");

    fireEvent.blur(userNameInput);
    fireEvent.blur(firstNameInput);
    fireEvent.blur(lastNameInput);

    await userEvent.click(submitButton);

    await waitFor(() => {
      const requiredErrors = screen.getAllByText(/required/i);
      expect(requiredErrors).toHaveLength(3);
    });

    // Switch tab to Contact
    const contactTabButton = screen.getByRole("tab", {
      name: "Contact Contact",
    });
    await userEvent.click(contactTabButton);

    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.blur(emailInput);

    await userEvent.click(submitButton);

    await waitFor(() => {
      const requiredError = screen.getByText(/required/i);
      expect(requiredError).toBeInTheDocument();
    });

    // Switch tab to Security
    const securityTabButton = screen.getByRole("tab", {
      name: "Security Security",
    });
    await userEvent.click(securityTabButton);

    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput =
      screen.getByPlaceholderText("Confirm Password");

    fireEvent.blur(passwordInput);
    fireEvent.blur(confirmPasswordInput);

    await userEvent.click(submitButton);

    await waitFor(() => {
      const requiredErrors = screen.getAllByText(/required/i);
      expect(requiredErrors).toHaveLength(2);
    });
  });

  test("should submit valid registration details", async () => {
    const navigate = vi.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    render(<Signup />);

    const submitButton = screen.getByRole("button", {
      name: "Sign up",
    });

    const userNameInput = screen.getByPlaceholderText("User Name");
    const firstNameInput = screen.getByPlaceholderText("First Name");
    const lastNameInput = screen.getByPlaceholderText("Last Name");

    await userEvent.type(userNameInput, "john");
    await userEvent.type(firstNameInput, "John");
    await userEvent.type(lastNameInput, "Doe");

    await userEvent.click(submitButton);

    // Switch tab to Contact
    const contactTabButton = screen.getByRole("tab", {
      name: "Contact Contact",
    });
    await userEvent.click(contactTabButton);

    const emailInput = screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "johndoe@email.com");

    await userEvent.click(submitButton);

    // Switch tab to Security
    const securityTabButton = screen.getByRole("tab", {
      name: "Security Security",
    });
    await userEvent.click(securityTabButton);

    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput =
      screen.getByPlaceholderText("Confirm Password");

    await userEvent.type(passwordInput, "Password1");
    await userEvent.type(confirmPasswordInput, "Password1");

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/welcome");
      expect(store.getState().auth.accessToken).toBe("exampleToken");
    });
  });

  test("sets auth state after successful login", async () => {
    render(<Signup />);

    const submitButton = screen.getByRole("button", {
      name: "Sign up",
    });

    const userNameInput = screen.getByPlaceholderText("User Name");
    const firstNameInput = screen.getByPlaceholderText("First Name");
    const lastNameInput = screen.getByPlaceholderText("Last Name");

    await userEvent.type(userNameInput, "invalid");
    await userEvent.type(firstNameInput, "Invalid");
    await userEvent.type(lastNameInput, "Invalid");

    await userEvent.click(submitButton);

    // Switch tab to Contact
    const contactTabButton = screen.getByRole("tab", {
      name: "Contact Contact",
    });
    await userEvent.click(contactTabButton);

    const emailInput = screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "invalidemail@email.com");

    await userEvent.click(submitButton);

    // Switch tab to Security
    const securityTabButton = screen.getByRole("tab", {
      name: "Security Security",
    });
    await userEvent.click(securityTabButton);

    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput =
      screen.getByPlaceholderText("Confirm Password");

    await userEvent.type(passwordInput, "Password1");
    await userEvent.type(confirmPasswordInput, "Password1");

    await userEvent.click(submitButton);

    const invalidLoginError = screen.getByText(/Please try again./i);
    expect(invalidLoginError).toBeInTheDocument();
  });

  test("should submit valid registration details", async () => {
    const navigate = vi.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    render(<Signup />);

    const submitButton = screen.getByRole("button", {
      name: "Sign up",
    });

    const userNameInput = screen.getByPlaceholderText("User Name");
    const firstNameInput = screen.getByPlaceholderText("First Name");
    const lastNameInput = screen.getByPlaceholderText("Last Name");

    await userEvent.type(userNameInput, "john");
    await userEvent.type(firstNameInput, "John");
    await userEvent.type(lastNameInput, "Doe");

    await userEvent.click(submitButton);

    // Switch tab to Contact
    const contactTabButton = screen.getByRole("tab", {
      name: "Contact Contact",
    });
    await userEvent.click(contactTabButton);

    const emailInput = screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "johndoe@email.com");

    await userEvent.click(submitButton);

    // Switch tab to Security
    const securityTabButton = screen.getByRole("tab", {
      name: "Security Security",
    });
    await userEvent.click(securityTabButton);

    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput =
      screen.getByPlaceholderText("Confirm Password");

    await userEvent.type(passwordInput, "Password1");
    await userEvent.type(confirmPasswordInput, "Password1");

    await userEvent.click(submitButton);

    await waitFor(() => {
      const state = store.getState().auth;
      expect(state.user?.userName).toBe("john");
      expect(state.accessToken).toBe("exampleToken");
    });
  });
});
