import { apiSlice } from "../apiSlice";
import {
  AuthResult,
  RefreshTokenResult,
  loginCredentials,
  registerCredentials,
} from "./authTypes";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResult, loginCredentials>({
      query: (credentials) => ({
        // This route will need to be changed /login/email is only for testing
        url: "/login/email",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation<AuthResult, registerCredentials>({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation<AuthResult, undefined>({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
    }),
    refreshToken: builder.mutation<RefreshTokenResult, undefined>({
      query: () => ({
        url: "/refresh-token",
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
} = authApiSlice;
