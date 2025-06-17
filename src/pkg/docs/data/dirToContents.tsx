import { CollapsibleItem } from "../cmpnts/Menu";

const withoutExtensions = (file: string) => file.replace(".html", "");

export const dirToContents = (
  dir: string[],
  topic: string,
): CollapsibleItem[] => {
  const items: CollapsibleItem[] = dir.map((file) => ({
    title: withoutExtensions(file),
    body: <></>,
    fetchPath: `${topic}`,
    filename: withoutExtensions(file),
  }));

  return items;
};
