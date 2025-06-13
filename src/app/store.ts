import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./api/auth/authSlice";
// import flowReducer from "./flow/flowSlice"; // Import the new slice
import ereaderSlice from "./ereader/ereaderSlice";
import chatSlice from "./chat/chatSlice";
import flowSlice from "./flow/flowSlice";
import reasoningSlice from "./reasoning/reasoningSlice";

import elevenLabsSlice from "./elevenLabs/eleventLabsSlice";
import errorBoundarySlice from "./errorBoundary/errorBoundarySlice";
import pageSlice from "./page/pageSlice";
import writerSlice from "./writer/writerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    ereader: ereaderSlice.reducer,
    chat: chatSlice.reducer,
    flow: flowSlice.reducer,
    reasoning: reasoningSlice.reducer,
    page: pageSlice.reducer,
    elevenLabs: elevenLabsSlice.reducer,
    errorBoundary: errorBoundarySlice.reducer,
    writer: writerSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  //Switch to false for production
  devTools: true,
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
