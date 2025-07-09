import { initialState } from "./config";
import { readerState } from "./types";

export function getInitialReaderData(): readerState {
  // Check local storage for flow data
  const readerData = localStorage.getItem("readerData");
  if (readerData) {
    return { ...initialState, ...JSON.parse(readerData) }; // Use spread operator to combine initial state
  }
  return initialState;
}
