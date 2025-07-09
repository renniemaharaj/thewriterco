import { Block } from "../../pkg/ai/types";

export type Model = {
  displayName: string;
  key: string;
  model: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  topK: number;
};

export type Chat = {
  messages: Block[];
  messageBoxRef: React.RefObject<HTMLDivElement>;
  conversationMode: "none" | "exchange";
  conversationTokens: number;
  responseConstraint: "short" | "shorter" | "detailed";
  models?: Model[];
};
