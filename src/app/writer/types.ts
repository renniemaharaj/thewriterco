type Content = any;

export type Save = {
  title: string;
  content: Content;
};

export type WriterProps = {
  title: string;
  content: Content;
  fullscreen: boolean;
  saves: Save[];
};
