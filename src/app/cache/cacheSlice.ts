import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getInitialChatState } from "./utils";
import { CachedValue } from "./types";

const cacheSlice = createSlice({
  name: "cache",
  initialState: getInitialChatState(),
  reducers: {
    setCache(
      state,
      action: PayloadAction<{ key: string; value: CachedValue }>,
    ) {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setCache } = cacheSlice.actions;

export default cacheSlice;
