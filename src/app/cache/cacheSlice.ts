import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CachedValue } from "./types";
import { initialStateWithLocalStorage } from "../utils";
import { initialState } from "./config";

const cacheSlice = createSlice({
  name: "cache",
  initialState: initialStateWithLocalStorage("cacheData", initialState),
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
