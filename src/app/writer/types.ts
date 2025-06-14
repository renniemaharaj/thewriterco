/* eslint-disable @typescript-eslint/no-explicit-any */
type Content = any;

export type Save = {
  title: string;
  content: Content;
};

export type WriterProps = {
  content: Content;
  saves: Save[];
};
