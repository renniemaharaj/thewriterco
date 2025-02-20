export type QueryForm = {
  visibility: boolean;
  textContent: string;
  operator: string;
  term: number;
};
export type GameEndNotice = {
  textContent: string;
  forceGuess: number;
};
export type RangeQuery = {
  rangeStart: number;
  rangeEnd: number;
};
