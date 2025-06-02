import { Content } from "../../../app/ereader/types";

const Current = ({
  getCurrentSlice,
  currentChapter,
  content,
}: {
  getCurrentSlice: () => string[];
  currentChapter: string;
  content: Content;
}) => {
  const currentSlice = getCurrentSlice();
  const firstVerse = currentSlice[0];

  if (!firstVerse) return null;

  return (
    <div
      className="max-w-[700px] text-center p-4 shadow-lg !bg-transparent"
      style={{ flex: 1 }}
    >
      <h3 className="text-lg font-bold">
        Chapter {currentChapter}, Verse {firstVerse}
      </h3>
      <p>
        {typeof content !== "string" && content[currentChapter]?.[firstVerse]}
      </p>
    </div>
  );
};

export default Current;
