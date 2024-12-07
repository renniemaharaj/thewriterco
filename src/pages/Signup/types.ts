import { ComponentProps } from "react";

export type Field = {
  label: string;
  name: string;
  type: ComponentProps<"input">["type"];
  placeholder?: string;
  defaultValue?: boolean | string | number | undefined;
  group: string;
};

export type FieldValues = {
  [key: string]: string | boolean | number | undefined;
};

export type Tab = {
  name: string;
  Title: string;
  members: Field[];
};

export type FormStepMeta = {
  state: string;
  displayMessage: string;
};
