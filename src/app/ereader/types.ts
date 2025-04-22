export type Content = string | Record<string, Record<string, string>>;

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
  readerStyle: "rich" | "bible";
  currentChapter: string | null;
  currentVerse: string | null;
  eContent: EBook;
};
