export type EBook = {
  title: string;
  description?: string;
  summary?: string;
  author?: string;
  date?: string;
  content: string | Record<string, Record<string, string>>;
};

export type EreaderState = {
  isOpen: boolean;
  readerStyle: "rich" | "bible";
  currentChapter: string | null;
  currentVerse: string | null;
  eContent: EBook;
};
