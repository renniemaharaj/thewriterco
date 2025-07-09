type Executable = {
  jsxTrigger: React.ReactNode;
};

type Context = {
  book: string;
  chapter: string | null;
  verse: string | null;
};

interface TaskAlterBookState {
  task: string;
  book: string;
  chapter: string;
  verse: string;
}

type Exchange = {
  role: "user" | "model" | "system";
  content: string;
};

type ResponseBlock = {
  type: "markup" | "scripture" | "code";
  content: MarkupResponse | Scripture | Code;
};

interface Block extends ResponseBlock {
  role: "user" | "model" | "system";
}

type MarkupResponse = {
  type: "markup";
  markupContent: string; // HTML-formatted string response
};

type Verse = {
  book: string; // Valid Bible book name
  chapterNo: string;
  verseNo: string;
  verseContent: string;
};

type Scripture = {
  type: "scripture";
  verses: Verse[];
};

type Code = {
  type: "code";
  language: string;
  filename: string;
  mimeType: string;
  codeContent: string;
  editorHeight: number;
};

type DefaultResponseSchema = {
  responseBlocks: ResponseBlock[];
};

export type {
  Executable,
  Context,
  ResponseBlock,
  MarkupResponse,
  Scripture,
  Verse,
  Code,
  DefaultResponseSchema,
  TaskAlterBookState,
  Block,
  Exchange,
};
