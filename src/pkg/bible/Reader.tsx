import { useEffect, useRef, useState } from "react";
import { Flex, IconButton, Select } from "@radix-ui/themes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  setGlobalCurrentChapter,
  setGlobalCurrentVerse,
} from "../../app/ereader/ereaderSlice";
import Header from "./Header";
import { ArrowBigLeft, ArrowBigRight, ArrowBigRightDash } from "lucide-react";
import { getChapterVerses } from "./utils/reader";
import SpeakIcon from "./SpeakIcon";

const SHADOW_COUNT = 4;

const Reader = ({ hidePicker }: { hidePicker?: boolean }) => {
  const dispatch = useDispatch();
  const eReaderState = useSelector((state: RootState) => state.ereader);
  const { isOpen, currentChapter, currentVerse, eContent, readerStyle } =
    eReaderState;

  const content = eContent.content;

  const chapterVerses = getChapterVerses({
    currentChapter,
    eContent: content,
  });

  const [readerState, setRenderState] = useState<"rich" | "bible">(readerStyle);
  const [parsedContent] = useState(eContent.content);
  const initialContentLoaded = useRef(false);
  const [shadowOffset, setShadowOffset] = useState(0);
  const [routeText, setRouteText] = useState("");

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
    const chapterVerses = getChapterVerses({
      currentChapter,
      eContent: content,
    });
    const currentIndex = chapterVerses.indexOf(currentVerse);
    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (newIndex < 0 && direction === "prev") {
      const prevChapter = Object.keys(eContent.content)[
        Object.keys(eContent.content).indexOf(currentChapter) - 1
      ];
      if (prevChapter && typeof eContent.content !== "string") {
        handleChapterChange(prevChapter);
        const lastVerse = Object.keys(eContent.content[prevChapter]).slice(
          -1,
        )[0];
        handleVerseChange(lastVerse);
      }
    } else if (newIndex >= chapterVerses.length && direction === "next") {
      const nextChapter = Object.keys(eContent.content)[
        Object.keys(eContent.content).indexOf(currentChapter) + 1
      ];
      if (nextChapter) handleChapterChange(nextChapter);
    } else {
      handleVerseChange(chapterVerses[newIndex]);
    }
  };

  const shadowVerses = () => {
    const currentIndex = chapterVerses.indexOf(currentVerse);
    return chapterVerses.slice(
      currentIndex + 1 + shadowOffset,
      currentIndex + 1 + shadowOffset + SHADOW_COUNT,
    );
  };

  const adjustShadowOffset = (direction: "next") => {
    const currentIndex = chapterVerses.indexOf(currentVerse);
    const totalVersesAfter = chapterVerses.length - (currentIndex + 1);
    const maxOffset = Math.max(0, totalVersesAfter - SHADOW_COUNT);

    if (
      direction === "next" &&
      shadowOffset + SHADOW_COUNT < totalVersesAfter
    ) {
      const newOffset = Math.min(shadowOffset + SHADOW_COUNT, maxOffset);
      setShadowOffset(newOffset);
      const newVerse = chapterVerses[currentIndex + 1 + newOffset];
      if (newVerse) dispatch(setGlobalCurrentVerse(newVerse));
    }
  };

  const routeCurrentVerses = () => {
    if (
      !currentChapter ||
      !currentVerse ||
      typeof eContent.content === "string"
    )
      return;
    const content = eContent.content[currentChapter];
    const text = `${content[currentVerse]} ${shadowVerses()
      .map((v) => content[v])
      .join(" ")}`;

    setRouteText(text);
  };
  return (
    <div
      className={`blurred-div fixed bottom-0 left-0 shadow-lg overflow-auto z-20 ${
        isOpen ? "h-full w-full" : "w-auto left-[50%] translate-x-[-50%]"
      }`}
    >
      <Header
        hidePicker={hidePicker ?? false}
        isOpen={isOpen}
        routeTextContent={routeText}
      />

      {isOpen && (
        <div className="!flex-col p-4 space-y-4">
          {eContent.description && (
            <p className="text-gray-700">{eContent.description}</p>
          )}
          {eContent.summary && (
            <p className="text-sm text-gray-500 italic">{eContent.summary}</p>
          )}
          {eContent.author && (
            <p className="text-sm text-gray-500">Author: {eContent.author}</p>
          )}

          {readerState === "bible" && (
            <Flex className="!gap-4 justify-center">
              <Select.Root
                value={currentChapter || ""}
                onValueChange={handleChapterChange}
              >
                <Select.Trigger>Chapter {currentChapter}</Select.Trigger>
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
                <Select.Trigger>Verse {currentVerse}</Select.Trigger>
                <Select.Content>
                  {chapterVerses.map((verse) => (
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
              <ArrowBigLeft />
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
              ) : (
                <div>
                  <h3 className="text-lg font-bold">
                    Chapter {currentChapter}, Verse {currentVerse}
                  </h3>
                  <p>
                    {typeof eContent.content !== "string" &&
                      eContent.content[currentChapter]?.[currentVerse]}
                  </p>
                </div>
              )}
            </div>

            <IconButton onClick={() => navigateVerse("next")} variant="soft">
              <ArrowBigRight />
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
                    ({currentChapter}:{currentVerse}){" "}
                    {typeof eContent.content !== "string" &&
                      eContent.content[currentChapter]?.[currentVerse]}
                  </span>
                  {shadowVerses().map(
                    (verse) =>
                      ` (${currentChapter}:${verse}) ${
                        typeof eContent.content !== "string" &&
                        eContent.content[currentChapter]?.[verse]
                      }`,
                  )}
                </p>
              </div>

              <Flex justify="center" align="center" className="gap-2">
                <IconButton
                  variant="soft"
                  disabled={
                    shadowOffset + SHADOW_COUNT >=
                    chapterVerses.length -
                      chapterVerses.indexOf(currentVerse) -
                      1
                  }
                  onClick={() => adjustShadowOffset("next")}
                >
                  <ArrowBigRightDash />
                </IconButton>

                <SpeakIcon onClick={() => routeCurrentVerses()} />
              </Flex>
            </Flex>
          )}
        </div>
      )}
    </div>
  );
};

export default Reader;
