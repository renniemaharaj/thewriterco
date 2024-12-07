import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { AuthResult, ServerError } from "./authTypes";

const initialState: AuthResult = {
  user: null,
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResult>) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logOut: (state) => {
      state.user = null;
      state.accessToken = null;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      const accessToken = action.payload;
      state.accessToken = accessToken;
      const user = localStorage.getItem("user");
      if (user) state.user = JSON.parse(user);
    },
  },
  initialState,
});

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.accessToken;

export default authSlice.reducer;

export const { setCredentials, logOut, setAccessToken } = authSlice.actions;

export const isServerError = (error: unknown): error is ServerError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof (error as { status?: unknown }).status === "number" &&
    "data" in error &&
    Array.isArray((error as { data?: unknown }).data) &&
    (error as { data: unknown[] }).data.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "type" in item &&
        typeof item.type === "string" &&
        "message" in item &&
        typeof item.message === "string",
    )
  );
};
