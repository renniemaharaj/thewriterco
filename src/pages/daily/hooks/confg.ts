import { Result } from "./types";

export const blankResult: Result = {
  title: "Missing or not found",
  commentaries: [],
  tags: [],
  summary:
    "This result either was deleted or could not be loaded. Please check below and view source",
  images: [],
  politicalBiases: [],
  href: "/",
};
