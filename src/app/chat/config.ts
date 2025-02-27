import React from "react";
import { Chat } from "./types";

export const initialState: Chat = {
  messages: [],
  orientation: "horizontal",
  messageBoxRef: React.createRef<HTMLDivElement>(),
  messageBoxMode: "visible",
  viewMode: "standard",
  conversationMode: "exchange",
  conversationTokens: 0,
  responseConstraint: "short",
};
