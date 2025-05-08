import { initialState } from "./config";

import { PageProps } from "./types";

export function getInitialPageData(): PageProps {
  // Check local storage for flow data
  const pageData = localStorage.getItem("pageData");
  if (pageData) {
    return { ...initialState, ...JSON.parse(pageData) }; // Use spread operator to combine initial state
  }
  return initialState;
}
