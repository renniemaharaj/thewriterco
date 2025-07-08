import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

// import * as msgPack from "@msgpack/msgpack";

const baseQuery = fetchBaseQuery({
  //
  // baseUrl: "https://thewriterco-auth.onrender.com",
  baseUrl: "https://thewriterco-auth-go.onrender.com", // Adjust to your base URL if needed
  // baseUrl: "http://localhost:3001", // Adjust to your base URL if needed
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth?.accessToken;
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    sendAskReq: builder.mutation<{ response: string }, { message: string }>({
      query: (body) => ({
        url: "/v1/ask",
        method: "POST",
        body: { message: body.message },
      }),
    }),

    sendFindReq: builder.mutation<{ response: string }, { message: string }>({
      query: (body) => ({
        url: "/v1/find",
        method: "POST",
        body: { message: body.message },
      }),
    }),
  }),
});

// Export the mutation hook
export const { useSendAskReqMutation, useSendFindReqMutation } = apiSlice;
