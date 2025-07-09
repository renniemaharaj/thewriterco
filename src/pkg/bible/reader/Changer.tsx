import { Flex } from "@radix-ui/themes";
import Chapter from "./Chapter";
import Verse from "./Verse";
import { Content } from "../../../app/reader/types";

const Changer = ({
  content,
  chapterVerses,
  currentChapter,
  currentVerse,
  handleVerseChange,
  handleChapterChange,
}: {
  content: Content;
  chapterVerses: string[];
  currentChapter: string;
  currentVerse: string;
  handleVerseChange: (verse: string) => void;
  handleChapterChange: (chapter: string) => void;
}) => {
  return (
    <Flex className="!gap-4 justify-center">
      <Chapter
        currentChapter={currentChapter}
        handleChapterChange={handleChapterChange}
        content={content}
      />
      <Verse
        chapterVerses={chapterVerses}
        currentVerse={currentVerse}
        handleVerseChange={handleVerseChange}
      />
    </Flex>
  );
};

export default Changer;
