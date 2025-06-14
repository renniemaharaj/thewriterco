import { initialState } from "./config";
import { WriterProps } from "./types";

export function getInitialWriterData(): WriterProps {
  // Check local storage for flow data
  const pageData = localStorage.getItem("writerData");

  if (pageData) {
    return {
      ...initialState,
      ...JSON.parse(pageData),
    }; // Use spread operator to combine initial state
  }
  return initialState;
}
