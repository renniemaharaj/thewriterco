import { GameEndNotice, QueryForm } from "./types";

export const rangeStart = 1;
export const rangeEnd = 100;

export const defaultQueryForm: QueryForm = {
  visibility: false,
  textContent: "For testing, set false after",
  operator: "",
  term: 0,
};

export const defaultForceGuess: GameEndNotice = {
  textContent: "I'm out of queries, making a guess....",
  forceGuess: 111,
};
