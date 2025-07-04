import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EBook, Favorite } from "./types";
import { getInitialReaderData } from "./utils";

const ereaderSlice = createSlice({
  name: "ereader",
  initialState: getInitialReaderData(),
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
      state.favorites = state.favorites.filter(
        (fav: Favorite) => fav.title !== action.payload,
      );
    },
    pushFavorite(state, action: PayloadAction<Favorite>) {
      const exists = state.favorites.some(
        (fav: Favorite) => fav.title === action.payload.title,
      );
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
} = ereaderSlice.actions;

export default ereaderSlice;
