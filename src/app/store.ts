import { configureStore } from "@reduxjs/toolkit";
import readerSlice from "./reader/readerSlice";
import chatSlice from "./chat/chatSlice";

import errorBoundarySlice from "./eBoundary/eBoundarySlice";
import pageSlice from "./page/pageSlice";
import writerSlice from "./writer/writerSlice";
import cacheSlice from "./cache/cacheSlice";
import { saveSliceToLocalStorage } from "./utils";
import { throttle } from "lodash";

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

store.subscribe(
  throttle(() => {
    const state = store.getState();
    saveSliceToLocalStorage("readerData", state.reader);
    saveSliceToLocalStorage("chatData", state.chat);
    saveSliceToLocalStorage("writerData", state.writer);
    saveSliceToLocalStorage("cacheData", state.cache);
  }, 1000), // Save at most once per second
);

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
