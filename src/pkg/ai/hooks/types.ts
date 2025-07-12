import { Action } from "../blocks/types";

export type ScrollHAndler = () => void;

export type ActionHandler = {
  action: Action;
  scrollHandler: ScrollHAndler;
};

export type SendHandler = {
  msg: string;
  defaultSending: boolean;
  scrollHandler: ScrollHAndler;
};

export type Command = {
  command: string;
  args: string[];
};
