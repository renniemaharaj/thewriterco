import introductionMessage from "./introduction";
import { EreaderState } from "./types";

const defaultContent = {
  title: "The Holy Bible",
  description: "An introduction to the Holy Bible",
  summary: "The sacred scripture of the Christian faith",
  content: introductionMessage,
};

export const initialState: EreaderState = {
  isOpen: false,
  readerStyle: "rich",
  currentChapter: "1",
  currentVerse: "1",
  eContent: defaultContent,
};
