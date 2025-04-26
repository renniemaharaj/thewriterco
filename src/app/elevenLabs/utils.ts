import { initialState } from "./config";

import { ElevenLabsConfig } from "./types";

export function getInitialElevenLabsState(): ElevenLabsConfig {
  // Check local storage for flow data
  const elevenLabs = localStorage.getItem("elevenLabsData");
  if (elevenLabs) {
    return { ...initialState, ...JSON.parse(elevenLabs) }; // Use spread operator to combine initial state
  }
  return initialState;
}
