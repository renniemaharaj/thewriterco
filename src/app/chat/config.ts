import React from "react";
import type { Chat } from "./types";

export const initialState: Chat = {
  messages: [],
  messageBoxRef: React.createRef<HTMLDivElement>(),
  conversationMode: "exchange",
  conversationTokens: 0,
  responseConstraint: "short",
};
