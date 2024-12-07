import { http, HttpResponse } from "msw";
import {
  loginCredentials,
  AuthResult,
  registerCredentials,
  RefreshTokenResult,
} from "../app/api/auth/authTypes";

const BASE_URL = "https://auth-api-gmxb.onrender.com";
const LOGIN_URL = `${BASE_URL}/login/email`;
const REGISTER_URL = `${BASE_URL}/register`;
const LOGOUT_URL = `${BASE_URL}/logout`;
const REFRESH_TOKEN_URL = `${BASE_URL}/refresh-token`;

const mockAuthResult: AuthResult = {
  accessToken: `exampleToken`,
  user: {
    _id: `userId`,
    userName: "john",
    firstName: "John",
    lastName: "Doe",
    emailAddress: "johndoe@email.com",
  },
};

type AuthParams = {
  param: "";
};

type MockError = {
  status?: number;
  message: string;
};

export const handlers = [
  // Mock login endpoint
  http.post<AuthParams, loginCredentials, AuthResult | MockError, string>(
    LOGIN_URL,
    async ({ request }) => {
      const { emailAddress, password } = await request.json();

      // Successful login
      if (emailAddress === "johndoe@email.com" && password === "password") {
        return HttpResponse.json(mockAuthResult, { status: 200 });
      }

      // Unsuccessful login
      return HttpResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    },
  ),

  //   Mock register endpoint
  http.post<AuthParams, registerCredentials, AuthResult | MockError, string>(
    REGISTER_URL,
    async ({ request }) => {
      const {
        userName,
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword,
      } = await request.json();

      // Successful registration
      if (
        userName === "john" &&
        firstName === "John" &&
        lastName === "Doe" &&
        emailAddress === "johndoe@email.com" &&
        password === "Password1" &&
        confirmPassword === "Password1"
      ) {
        return HttpResponse.json(mockAuthResult, { status: 201 });
      }

      // Unsuccessful registration
      return HttpResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    },
  ),

  // Mock logout endpoint
  http.get(LOGOUT_URL, () => {
    return new HttpResponse(null, { status: 200 });
  }),

  // Mock refresh-token endpoint
  http.get<AuthParams, null, RefreshTokenResult>(
    REFRESH_TOKEN_URL,
    (request) => {
      // console.log("Request cookies", request.cookies.jwt);
      // console.log("Access token", store.getState().auth.accessToken);
      if (!request.cookies.jwt) {
        console.log("No refresh token");
        return HttpResponse.json({ accessToken: undefined });
      }
      return HttpResponse.json({ accessToken: "exampleToken" });
    },
  ),
];
