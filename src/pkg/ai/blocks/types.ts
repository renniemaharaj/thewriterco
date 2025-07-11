import { Block } from "../types";

export type MessageAction = "fix" | "new";

export type MessageProps = {
  block: Block;
  handleAction?: (action: MessageAction) => void;
  onMount?: () => void;
};
