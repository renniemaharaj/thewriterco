/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getInitialWriterData } from "./utils";
import { Save } from "./types";

const writerSlice = createSlice({
  name: "writer",
  initialState: getInitialWriterData(),
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setContent: (state, action: PayloadAction<any>) => {
      state.content = action.payload;
    },
    saveToLocalStorage: (state, action: PayloadAction<Save>) => {
      const existingIndex = state.saves.findIndex(
        (save) => save.title === action.payload.title,
      );

      if (existingIndex !== -1) {
        state.saves[existingIndex] = action.payload;
      } else {
        state.saves.push(action.payload);
      }
    },
    deleteByTitle: (state, action: PayloadAction<string>) => {
      state.saves = state.saves.filter((save) => save.title !== action.payload);
    },
    renameByTitle: (
      state,
      action: PayloadAction<{ oldTitle: string; newTitle: string }>,
    ) => {
      const { oldTitle, newTitle } = action.payload;
      const save = state.saves.find((s) => s.title === oldTitle);
      if (save) {
        save.title = newTitle;
      }
    },
  },
});

export const {
  setTitle,
  setContent,
  saveToLocalStorage,
  deleteByTitle,
  renameByTitle,
} = writerSlice.actions;

export default writerSlice;
