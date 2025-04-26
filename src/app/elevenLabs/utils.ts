import { initialState } from "./config";

import { ElevenLabsState } from "./types";

export function getInitialElevenLabsState(): ElevenLabsState {
  // Check local storage for flow data
  const elevenLabs = localStorage.getItem("elevenLabs");
  if (elevenLabs) {
    return JSON.parse(elevenLabs); // Use spread operator to combine initial state
  }
  return initialState;
}
