import { Flex } from "@radix-ui/themes";
import type { Content } from "../../../app/reader/types";

const Shadow = ({
  currentSlice,
  currentChapter,
  content,
}: {
  currentSlice: string[];
  currentVerse: string;
  currentChapter: string;
  chapterVerses: string[];
  content: Content;
  slideCurrentVerses: () => void;
}) => {
  return (
    currentSlice.length > 0 && (
      <Flex justify="center" align="center" className="!flex-col text-sm mt-4 gap-4 p-2 rounded-md">
        <div className="blurred-div max-w-[700px] text-center p-4 shadow-lg rounded-md">
          <p>
            {currentSlice.map((verse, index) => (
              <span key={"bible-verse-" + index} className={`${index == 0 && "font-bold"}`}>
                {" "}
                ({currentChapter}:{verse}){" "}
                {typeof content !== "string" && content[currentChapter]?.[verse]}
              </span>
            ))}
          </p>
        </div>
      </Flex>
    )
  );
};

export default Shadow;
