import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./utils";
import { EBook } from "./types";

const ereaderSlice = createSlice({
  name: "ereader",
  initialState,
  reducers: {
    setEBook(state, action: PayloadAction<EBook>) {
      state.eContent = action.payload;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.eContent.title = action.payload;
    },
    setDescription(state, action: PayloadAction<string | undefined>) {
      state.eContent.description = action.payload;
    },
    setSummary(state, action: PayloadAction<string | undefined>) {
      state.eContent.summary = action.payload;
    },
    setAuthor(state, action: PayloadAction<string | undefined>) {
      state.eContent.author = action.payload;
    },
    setDate(state, action: PayloadAction<string | undefined>) {
      state.eContent.date = action.payload;
    },
    setContent(
      state,
      action: PayloadAction<string | Record<string, Record<string, string>>>,
    ) {
      state.eContent.content = action.payload;
    },
    setRenderStyle(state, action: PayloadAction<"rich" | "bible">) {
      state.readerStyle = action.payload;
    },
  },
});

export const {
  setEBook,
  setTitle,
  setDescription,
  setSummary,
  setAuthor,
  setDate,
  setContent,
  setRenderStyle,
} = ereaderSlice.actions;

export default ereaderSlice;
