import type { Favorite } from "../../pkg/bible/reader/favorites/types";

export type Content =
  | {
      [chapterId: string]: {
        [verseId: string]: string; // You can replace `any` with actual verse content type
      };
    }
  | string;

export type EBook = {
  title: string;
  description?: string;
  summary?: string;
  author?: string;
  date?: string;
  content: Content;
};

export type readerState = {
  isOpen: boolean;
  favorites: Favorite[];
  currentChapter: string;
  currentVerse: string;
  eBook: EBook;
  selectedVoice: string;
  speechEnabled: boolean;
  speaking: boolean;
};
