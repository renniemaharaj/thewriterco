import { Block } from "../../components/ai/types";

export type Chat = {
  messages: Block[];
  orientation: "horizontal" | "vertical";
  messageBoxRef: React.RefObject<HTMLDivElement>;
  messageBoxMode: "hidden" | "visible";
  viewMode: "standard" | "canvas";
  viewModeUpdateToggle: boolean;
  conversationMode: "none" | "exchange";
  conversationTokens: number;
  responseConstraint: "short" | "shorter" | "detailed";
};
