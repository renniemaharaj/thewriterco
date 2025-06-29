import { initialState } from "./config";

import { Cache } from "./types";

export function getInitialChatState(): Cache {
  // Check local storage for flow data
  const cacheData = localStorage.getItem("cacheData");
  if (cacheData) {
    return { ...initialState, ...JSON.parse(cacheData) }; // Use spread operator to combine initial state
  }
  return initialState;
}
