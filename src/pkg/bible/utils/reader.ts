import { Content } from "../../../app/ereader/types";

export const getChapterVerses = ({
  currentChapter,
  eContent,
}: {
  currentChapter: string;
  eContent: Content;
}) => {
  if (!currentChapter || typeof eContent === "string") return [];
  if (!eContent[currentChapter]) return [];
  return Object.keys(eContent[currentChapter]);
};
