import { useEffect, useRef, useState } from "react";
import { Button, Flex, IconButton, Select } from "@radix-ui/themes";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  setGlobalCurrentChapter,
  setGlobalCurrentVerse,
} from "../../app/ereader/ereaderSlice";
import Renderer from "./Renderer";
import { PlayIcon } from "lucide-react";

const SHADOW_COUNT = 4;

const Reader = ({ hidePicker }: { hidePicker?: boolean }) => {
  const dispatch = useDispatch();

  const eReaderState = useSelector((state: RootState) => state.ereader);
  const { isOpen, currentChapter, currentVerse, eContent, readerStyle } =
    eReaderState;

  const [readerState, setRenderState] = useState<"rich" | "bible">(readerStyle);
  const [parsedContent] = useState(eContent.content);
  const initialContentLoaded = useRef(false);
  const [shadowOffset, setShadowOffset] = useState(0);

  useEffect(() => {
    setRenderState(readerStyle);
    setTimeout(() => (initialContentLoaded.current = true), 1000);
  }, [readerStyle]);

  useEffect(() => {
    setShadowOffset(0);
  }, [currentChapter, currentVerse]);

  const handleChapterChange = (chapter: string) => {
    dispatch(setGlobalCurrentChapter(chapter));
    dispatch(setGlobalCurrentVerse("1"));
  };

  const handleVerseChange = (verse: string) => {
    dispatch(setGlobalCurrentVerse(verse));
  };

  const navigateVerse = (direction: "prev" | "next") => {
    if (
      !currentChapter ||
      !currentVerse ||
      typeof eContent.content === "string"
    )
      return;

    const chapterVerses = Object.keys(eContent.content[currentChapter]);
    const currentIndex = chapterVerses.indexOf(currentVerse);
    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (newIndex < 0 && direction === "prev") {
      const prevChapters = Object.keys(eContent.content);
      const prevChapter =
        prevChapters[prevChapters.indexOf(currentChapter) - 1];
      if (prevChapter) {
        handleChapterChange(prevChapter);
        const lastVerse = Object.keys(eContent.content[prevChapter]).slice(
          -1,
        )[0];
        handleVerseChange(lastVerse);
      }
    } else if (newIndex >= chapterVerses.length && direction === "next") {
      const nextChapters = Object.keys(eContent.content);
      const nextChapter =
        nextChapters[nextChapters.indexOf(currentChapter) + 1];
      if (nextChapter) handleChapterChange(nextChapter);
    } else {
      handleVerseChange(chapterVerses[newIndex]);
    }
  };

  const shadowVerses = () => {
    if (
      !currentChapter ||
      !currentVerse ||
      typeof eContent.content === "string"
    )
      return [];

    const chapterVerses = Object.keys(eContent.content[currentChapter]);
    const currentIndex = chapterVerses.indexOf(currentVerse);
    return chapterVerses.slice(
      currentIndex + 1 + shadowOffset,
      currentIndex + 1 + shadowOffset + SHADOW_COUNT,
    );
  };

  const adjustShadowOffset = (direction: "prev" | "next") => {
    if (
      !currentChapter ||
      !currentVerse ||
      typeof eContent.content === "string"
    )
      return;

    const chapterVerses = Object.keys(eContent.content[currentChapter]);
    const currentIndex = chapterVerses.indexOf(currentVerse);
    const totalVersesAfter = chapterVerses.length - (currentIndex + 1);
    const maxOffset = Math.max(0, totalVersesAfter - SHADOW_COUNT);

    let newOffset = shadowOffset;

    if (
      direction === "next" &&
      shadowOffset + SHADOW_COUNT < totalVersesAfter
    ) {
      newOffset = Math.min(shadowOffset + SHADOW_COUNT, maxOffset);
      setShadowOffset(newOffset);
    }

    const newVerseIndex = currentIndex + 1 + newOffset;
    const newVerse = chapterVerses[newVerseIndex];

    if (newVerse) {
      dispatch(setGlobalCurrentVerse(newVerse));
    }
  };

  const [readTextOverride, setReadTextOverride] = useState("");

  return (
    <div
      className={`blurred-div fixed bottom-0 left-0 shadow-lg overflow-auto z-20 ${
        isOpen ? "h-full w-full" : "w-auto left-[50%] translate-x-[-50%]"
      }`}
    >
      <Renderer
        hidePicker={hidePicker ?? false}
        isOpen={isOpen}
        title={eContent.title}
        override={readTextOverride}
      />

      {isOpen && (
        <div className="!flex-col p-4 space-y-4">
          {eContent.description && (
            <p className="text-gray-700">{eContent.description}</p>
          )}
          {eContent.summary && (
            <p className="text-sm text-gray-500 italic">{eContent.summary}</p>
          )}
          {(eContent.author || eContent.date) && (
            <div className="text-sm text-gray-500">
              {eContent.author && <p>Author: {eContent.author}</p>}
            </div>
          )}

          {readerState === "bible" && (
            <Flex className="!gap-4 justify-center">
              <Select.Root
                value={currentChapter || ""}
                onValueChange={handleChapterChange}
              >
                <Select.Trigger>
                  <Button variant="soft">{"Chapter " + currentChapter}</Button>
                </Select.Trigger>
                <Select.Content>
                  {Object.keys(eContent.content).map((chapter) => (
                    <Select.Item key={"chapter-" + chapter} value={chapter}>
                      {chapter}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>

              <Select.Root
                value={currentVerse || ""}
                onValueChange={handleVerseChange}
              >
                <Select.Trigger>
                  <Button variant="soft">{"Verse " + currentVerse}</Button>
                </Select.Trigger>
                <Select.Content>
                  {currentChapter &&
                    Object.keys(
                      typeof eContent.content !== "string"
                        ? eContent.content[currentChapter] || {}
                        : {},
                    ).map((verse) => (
                      <Select.Item key={"verse-" + verse} value={verse}>
                        {verse}
                      </Select.Item>
                    ))}
                </Select.Content>
              </Select.Root>
            </Flex>
          )}

          <Flex className="!justify-center !items-center space-x-4">
            <IconButton onClick={() => navigateVerse("prev")} variant="soft">
              <ChevronLeftIcon />
            </IconButton>

            <div
              className="max-w-[700px] text-center p-4 shadow-lg !bg-transparent"
              style={{ flex: 1 }}
            >
              {readerState === "rich" && typeof parsedContent === "string" ? (
                <pre
                  className="whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: parsedContent }}
                />
              ) : currentChapter && currentVerse ? (
                <div>
                  <h3 className="text-lg font-bold">
                    Chapter {currentChapter}, Verse {currentVerse}
                  </h3>
                  <p>
                    {typeof eContent.content !== "string" &&
                      eContent.content[currentChapter][currentVerse]}
                  </p>
                </div>
              ) : (
                <p>No content to display.</p>
              )}
            </div>

            <IconButton onClick={() => navigateVerse("next")} variant="soft">
              <ChevronRightIcon />
            </IconButton>
          </Flex>

          {shadowVerses().length > 0 && (
            <Flex
              justify="center"
              align="center"
              className="!flex-col text-sm mt-4 gap-4 p-2 rounded-md"
            >
              <div className="blurred-div max-w-[700px] text-center p-4 shadow-lg rounded-md">
                <p>
                  <span className="font-bold">
                    {currentChapter &&
                      currentVerse &&
                      typeof eContent.content !== "string" &&
                      `(${currentChapter}:${currentVerse}) ${eContent.content[currentChapter][currentVerse]}`}
                  </span>
                  {shadowVerses().map(
                    (verse) =>
                      ` (${currentChapter}:${verse}) ${
                        currentChapter &&
                        typeof eContent.content !== "string" &&
                        eContent.content[currentChapter][verse]
                      }`,
                  )}
                </p>
              </div>

              <Flex justify="center" align="center" className="gap-2">
                <IconButton
                  variant="soft"
                  disabled={
                    !currentChapter ||
                    !currentVerse ||
                    typeof eContent.content === "string" ||
                    shadowOffset + SHADOW_COUNT >=
                      Object.keys(eContent.content[currentChapter]).length -
                        Object.keys(eContent.content[currentChapter]).indexOf(
                          currentVerse,
                        ) -
                        1
                  }
                  onClick={() => adjustShadowOffset("next")}
                >
                  <ChevronRightIcon />
                </IconButton>
                {/* Add a button to play the current verse plus shadows*/}
                <IconButton
                  variant="soft"
                  onClick={() => {
                    if (
                      currentChapter &&
                      currentVerse &&
                      typeof eContent.content !== "string"
                    ) {
                      const versesToRead = shadowVerses();
                      const content = eContent.content;
                      if (
                        typeof content !== "string" &&
                        content[currentChapter]
                      ) {
                        const textToRead = `${currentChapter}:${currentVerse} ${content[currentChapter][currentVerse]} ${versesToRead
                          .map(
                            (verse) =>
                              `(${currentChapter}:${verse}) ${content[currentChapter][verse]}`,
                          )
                          .join(" ")}`;
                        setReadTextOverride(textToRead);
                      }
                    }
                  }}
                  disabled
                >
                  <PlayIcon />
                </IconButton>
              </Flex>
            </Flex>
          )}
        </div>
      )}
    </div>
  );
};

export default Reader;
