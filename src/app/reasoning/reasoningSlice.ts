import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./utils";

const reasoningSlice = createSlice({
  name: "reasoning",
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<string>) => {
      state.titleToggled = action.payload;
    },
  },
});

export const { toggle: toggleReasoningTitle } = reasoningSlice.actions;

export default reasoningSlice;
