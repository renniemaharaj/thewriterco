import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getInitialElevenLabsState } from "./utils";

const elevenLabsSlice = createSlice({
  name: "elevenLabs",
  initialState: getInitialElevenLabsState(), // Use the function to get the initial state
  reducers: {
    // Set the Eleven Labs API key
    SetApiKey(state, action: PayloadAction<string>) {
      state.apiKey = action.payload;
    },
  },
});

export const { SetApiKey } = elevenLabsSlice.actions;

export default elevenLabsSlice;
