type Executable = {
  jsxTrigger: React.ReactNode;
};

interface BlockElement {
  jsxElem: React.ReactNode;
}

interface Block {
  sender: "User" | "AI" | "System";
  type: "text" | "code";
  content: string;
  language?: string;
}

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

export type { Executable, BlockElement, Block, Context, TaskAlterBookState };
