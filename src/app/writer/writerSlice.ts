/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getInitialWriterData } from "./utils";
import { Save } from "./types";

const writerSlice = createSlice({
  name: "writer",
  initialState: getInitialWriterData(),
  reducers: {
    setContent: (state, action: PayloadAction<any>) => {
      state.content = action.payload;
    },
    saveToLocalStorage: (state, actions: PayloadAction<Save>) => {
      state.saves = [...state.saves, actions.payload];
    },
  },
});

export const { setContent, saveToLocalStorage } = writerSlice.actions;

export default writerSlice;
