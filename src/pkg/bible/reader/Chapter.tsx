import { Select } from "@radix-ui/themes";
import type { Content } from "../../../app/reader/types";

const Chapter = ({
  currentChapter,
  content,
  handleChapterChange,
}: {
  currentChapter: string;
  content: Content;
  handleChapterChange: (chapter: string) => void;
}) => {
  return (
    <Select.Root value={currentChapter} onValueChange={handleChapterChange}>
      <Select.Trigger>Chapter {currentChapter}</Select.Trigger>
      <Select.Content>
        {Object.keys(content).map(chapter => (
          <Select.Item key={"chapter-" + chapter} value={chapter}>
            {chapter}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default Chapter;
