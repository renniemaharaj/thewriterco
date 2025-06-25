import { initialState } from "./config";
import { EreaderState } from "./types";

export function getInitialReaderData(): EreaderState {
  // Check local storage for flow data
  const readerData = localStorage.getItem("readerData");
  if (readerData) {
    return { ...initialState, ...JSON.parse(readerData) }; // Use spread operator to combine initial state
  }
  return initialState;
}
