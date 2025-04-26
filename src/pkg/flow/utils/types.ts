interface Node {
  id: string;
  type: string;
  data?: {
    label?: string;
    expression?: string;
  };
}

interface Edge {
  id: string;
  source: string;
  target: string;
}

export type { Node, Edge };
