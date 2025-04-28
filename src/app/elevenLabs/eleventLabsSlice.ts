import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getInitialElevenLabsState } from "./utils";
import { ElevenLabsState } from "./types";

const elevenLabsSlice = createSlice({
  name: "elevenLabs",
  initialState: getInitialElevenLabsState(), // Use the function to get the initial state
  reducers: {
    // Set the Eleven Labs API key
    SetApiKey(state, action: PayloadAction<string>) {
      state.apiKey = action.payload;
    },
    SetElevenLabs(state, action: PayloadAction<ElevenLabsState>) {
      const { apiKey } = action.payload;
      state.apiKey = apiKey;
    },
    SetEnabled(state, action: PayloadAction<boolean>) {
      state.enabled = action.payload;
    },
    SetSelectedVoice(state, action: PayloadAction<string>) {
      state.selectedVoice = action.payload;
    },
  },
});

export const { SetApiKey, SetElevenLabs, SetEnabled, SetSelectedVoice } =
  elevenLabsSlice.actions;

export default elevenLabsSlice;
