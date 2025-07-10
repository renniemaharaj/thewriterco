import { readerState } from "./types";

const introductionMessage = ``;
export default introductionMessage;

const defaultContent = {
  title: "Bible",
  description: "An introduction to the Holy Bible",
  summary: "The sacred scripture of the Christian faith",
  content: introductionMessage,
};

export const initialState: readerState = {
  isOpen: false,
  favorites: [],
  currentChapter: "1",
  currentVerse: "1",
  selectedVoice: "",
  eBook: defaultContent,
  speechEnabled: false,
  speaking: false,
};
