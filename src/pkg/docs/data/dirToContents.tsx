import type { CollapsibleItem } from "../cmpnts/Menu";

const withoutExtensions = (file: string) => file.replace(".html", "");

export const dirToContents = (dir: string[]): CollapsibleItem[] => {
  const items: CollapsibleItem[] = dir.map(file => ({
    title: withoutExtensions(file),
  }));

  return items;
};
