import { initialState } from "./config";

import { Chat } from "./types";

export function getInitialChatState(): Chat {
  // Check local storage for flow data
  const chatData = localStorage.getItem("chatData");
  if (chatData) {
    return { ...initialState, ...JSON.parse(chatData) }; // Use spread operator to combine initial state
  }
  return initialState;
}
