import { configureStore } from "@reduxjs/toolkit";
import readerSlice from "./reader/readerSlice";
import chatSlice from "./chat/chatSlice";

import errorBoundarySlice from "./eBoundary/eBoundarySlice";
import pageSlice from "./page/pageSlice";
import writerSlice from "./writer/writerSlice";
import cacheSlice from "./cache/cacheSlice";

export const store = configureStore({
  reducer: {
    reader: readerSlice.reducer,
    chat: chatSlice.reducer,
    page: pageSlice.reducer,
    errorBoundary: errorBoundarySlice.reducer,
    writer: writerSlice.reducer,
    cache: cacheSlice.reducer,
  },
  //Switch to false for production
  devTools: false,
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
