import type { Block } from "../types";

export type Action = "fix" | "new";

export type MessageProps = {
  block: Block;
  scrollHandler: () => void;
  onMount?: () => void;
};
