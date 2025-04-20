import { Block } from "../../components/ai/types";

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
  orientation: "horizontal" | "vertical";
  messageBoxRef: React.RefObject<HTMLDivElement>;
  viewMode: "standard" | "canvas";
  conversationMode: "none" | "exchange";
  conversationTokens: number;
  responseConstraint: "short" | "shorter" | "detailed";
  models?: Model[];
};
