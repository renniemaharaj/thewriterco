import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./utils";

const reasoningSlice = createSlice({
  name: "reasoning",
  initialState,
  reducers: {
    setCurrentTitle: (state, action: PayloadAction<string>) => {
      state.currentTitle = action.payload;
    },
    setCurrentTab: (state, action: PayloadAction<string>) => {
      state.currentTab = action.payload;
    },
  },
});

export const { setCurrentTitle, setCurrentTab } = reasoningSlice.actions;

export default reasoningSlice;
