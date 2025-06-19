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

export type EreaderState = {
  isOpen: boolean;
  currentChapter: string;
  currentVerse: string;
  eContent: EBook;
  speaking: boolean;
};
