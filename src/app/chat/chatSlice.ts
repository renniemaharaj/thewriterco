import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { initialState } from "./config";
import { Block } from "../../components/ai/types";
import { getInitialChatState } from "./utils";

const ereaderSlice = createSlice({
  name: "chat",
  initialState: getInitialChatState(),
  reducers: {
    // Add a new message to the chat
    addMessage(state, action: PayloadAction<Block>) {
      state.messages.push(action.payload);
    },
    // Remove a message from the chat
    spliceMessage(state, action: PayloadAction<number>) {
      state.messages.splice(action.payload, 1);
    },
    // Set the message box mode of the chat
    setMessageBoxMode(state, action: PayloadAction<"hidden" | "visible">) {
      state.messageBoxMode = action.payload;
    },
    // Clear all messages from the chat
    clearMessages(state) {
      state.messages = [];
    },
    // Set the orientation of the chat
    setOrientation(state, action: PayloadAction<"horizontal" | "vertical">) {
      state.orientation = action.payload;
    },
    // Set the view mode of the chat
    setViewMode(state, action: PayloadAction<"standard" | "canvas">) {
      state.viewMode = action.payload;
    },
    // Set the conversation mode of the chat
    setConversationMode(state, action: PayloadAction<"none" | "exchange">) {
      state.conversationMode = action.payload;
    },
    // Set the response constraint of the chat
    setResponseConstraint(
      state,
      action: PayloadAction<"short" | "shorter" | "detailed">,
    ) {
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
  setMessageBoxMode,
  clearMessages,
  setOrientation,
  setViewMode,
  setConversationMode,
  setResponseConstraint,
  setConversationTokens,
} = ereaderSlice.actions;

export default ereaderSlice;
