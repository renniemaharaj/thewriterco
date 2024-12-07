import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "./auth/authSlice";
import { RootState } from "../store";

type RefreshTokenResponse = {
  accessToken: string;
};

const baseQuery = fetchBaseQuery({
  baseUrl: "https://auth-api-gmxb.onrender.com",
  // baseUrl: "http://localhost:3001",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth?.accessToken;
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: FetchArgs | string,
  api: BaseQueryApi,
  extraOptions: object,
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 403) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh-token", api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const { accessToken } = refreshResult.data as RefreshTokenResponse;
      const user = (api.getState() as RootState).auth.user;
      //store the new token
      api.dispatch(setCredentials({ user, accessToken }));
      //retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: () => ({}),
});
