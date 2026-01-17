import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { initialState } from "./config";
import type { Block } from "../../pkg/ai/types";
import { initialStateWithLocalStorage } from "../utils";
import { initialState } from "./config";

const ereaderSlice = createSlice({
  name: "chat",
  initialState: initialStateWithLocalStorage("chatData", initialState),
  reducers: {
    // Add a new message to the chat
    addMessage(state, action: PayloadAction<Block>) {
      state.messages.push(action.payload);
    },
    // Remove a message from the chat
    spliceMessage(state, action: PayloadAction<number>) {
      state.messages.splice(action.payload, 1);
    },
    // Remove all system messages from the chat
    nukeSystemMessages(state) {
      state.messages = state.messages.filter(message => message.role !== "system");
    },
    // Clear all messages from the chat
    clearMessages(state) {
      state.messages = [];
    },
    // Set the conversation mode of the chat
    setConversationMode(state, action: PayloadAction<"none" | "exchange">) {
      state.conversationMode = action.payload;
    },
    // Set the response constraint of the chat
    setResponseConstraint(state, action: PayloadAction<"short" | "shorter" | "detailed">) {
      state.responseConstraint = action.payload;
    },
    // Set the number of conversation tokens
    setConversationTokens(state, action: PayloadAction<number>) {
      state.conversationTokens = action.payload;
    },
  },
});

export const {
  addMessage,
  spliceMessage,
  nukeSystemMessages,
  clearMessages,
  setConversationMode,
  setResponseConstraint,
  setConversationTokens,
} = ereaderSlice.actions;

export default ereaderSlice;
