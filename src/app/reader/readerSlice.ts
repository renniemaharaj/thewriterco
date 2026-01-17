import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { Favorite } from "../../pkg/bible/reader/favorites/types";
import { initialStateWithLocalStorage } from "../utils";
import { initialState } from "./config";
import type { EBook } from "./types";

const readerSlice = createSlice({
  name: "reader",
  initialState: initialStateWithLocalStorage("readerData", initialState),
  reducers: {
    setEBook(state, action: PayloadAction<EBook>) {
      state.eBook = action.payload;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.eBook.title = action.payload;
    },
    setDescription(state, action: PayloadAction<string | undefined>) {
      state.eBook.description = action.payload;
    },
    setSummary(state, action: PayloadAction<string | undefined>) {
      state.eBook.summary = action.payload;
    },
    setAuthor(state, action: PayloadAction<string | undefined>) {
      state.eBook.author = action.payload;
    },
    setDate(state, action: PayloadAction<string | undefined>) {
      state.eBook.date = action.payload;
    },
    setContent(state, action: PayloadAction<string | Record<string, Record<string, string>>>) {
      state.eBook.content = action.payload;
    },
    setOpenState(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
    toggleOpenState(state) {
      state.isOpen = !state.isOpen;
    },
    setGlobalCurrentChapter(state, action: PayloadAction<string>) {
      state.currentChapter = action.payload;
    },
    setGlobalCurrentVerse(state, action: PayloadAction<string>) {
      state.currentVerse = action.payload;
    },
    setSpeaking(state, action: PayloadAction<boolean>) {
      state.speaking = action.payload;
    },
    setSpeechEnabled(state, action: PayloadAction<boolean>) {
      state.speechEnabled = action.payload;
    },
    setSelectedVoice(state, action: PayloadAction<string>) {
      state.selectedVoice = action.payload;
    },
    toggleSpeaking(state) {
      state.speaking = !state.speaking;
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter((fav: Favorite) => fav.title !== action.payload);
    },
    pushFavorite(state, action: PayloadAction<Favorite>) {
      const exists = state.favorites.some((fav: Favorite) => fav.title === action.payload.title);
      if (!exists) {
        state.favorites.push(action.payload);
      }
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
  setOpenState,
  toggleOpenState,
  setGlobalCurrentChapter,
  setGlobalCurrentVerse,
  setSpeaking,
  setSpeechEnabled,
  setSelectedVoice,
  toggleSpeaking,
  pushFavorite,
  removeFavorite,
} = readerSlice.actions;

export default readerSlice;
