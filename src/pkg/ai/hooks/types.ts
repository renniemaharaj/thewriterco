import type { Action } from "../blocks/types";

export type ScrollHandler = () => void;

export type ActionHandler = {
  action: Action;
  scrollHandler: ScrollHandler;
};

export type SendHandler = {
  msg: string;
  defaultSending?: boolean;
  scrollHandler: ScrollHandler;
};

export type Command = {
  command: string;
  args: string[];
};
