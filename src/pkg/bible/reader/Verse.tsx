import { Select } from "@radix-ui/themes";

const Verse = ({
  chapterVerses,
  currentVerse,
  handleChapterChange: handleVerseChange,
}: {
  chapterVerses: string[];
  currentVerse: string;
  handleChapterChange: (chapter: string) => void;
}) => {
  return (
    <Select.Root value={currentVerse} onValueChange={handleVerseChange}>
      <Select.Trigger>Verse {currentVerse}</Select.Trigger>
      <Select.Content>
        {chapterVerses.map((verse) => (
          <Select.Item key={"verse-" + verse} value={verse}>
            {verse}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default Verse;
