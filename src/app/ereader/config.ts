import introductionMessage from "./introduction";
import { EreaderState } from "./types";

const defaultContent = {
  title: "Bible",
  description: "An introduction to the Holy Bible",
  summary: "The sacred scripture of the Christian faith",
  content: introductionMessage,
};

export const initialState: EreaderState = {
  isOpen: false,
  currentChapter: "1",
  currentVerse: "1",
  selectedVoice: "",
  eContent: defaultContent,
  speechEnabled: false,
  speaking: false,
};
