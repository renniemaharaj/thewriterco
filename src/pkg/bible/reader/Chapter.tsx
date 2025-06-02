import { Select } from "@radix-ui/themes";
import { Content } from "../../../app/ereader/types";

const Chapter = ({
  currentChapter,
  handleChapterChange,
  content,
}: {
  currentChapter: string;
  handleChapterChange: (chapter: string) => void;
  content: Content;
}) => {
  return (
    <Select.Root value={currentChapter} onValueChange={handleChapterChange}>
      <Select.Trigger>Chapter {currentChapter}</Select.Trigger>
      <Select.Content>
        {Object.keys(content).map((chapter) => (
          <Select.Item key={"chapter-" + chapter} value={chapter}>
            {chapter}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default Chapter;
