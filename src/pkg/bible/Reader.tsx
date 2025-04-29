import { useEffect, useRef, useState, useMemo } from "react";
import { Flex, IconButton, Select } from "@radix-ui/themes";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Header from "./Header";
import { ArrowBigLeft, ArrowBigRight, ArrowBigRightDash } from "lucide-react";
import { getChapterVerses } from "./utils/reader";
import SpeakIcon from "./SpeakIcon";
import { SHADOW_COUNT } from "./config";
import { useContentReducers } from "../hooks/useContentReducers";

const Reader = ({ hidePicker }: { hidePicker?: boolean }) => {
  const eReaderState = useSelector((state: RootState) => state.ereader);
  const { isOpen, currentChapter, currentVerse, eContent, readerStyle } =
    eReaderState;
  const content = eContent.content;

  const {
    getTextContent,
    getCurrentSlice,
    slideCurrentVerses,
    handleChapterChange,
    handleVerseChange,
    navigateVerse,
  } = useContentReducers();

  const chapterVerses = useMemo(
    () => getChapterVerses({ currentChapter, eContent: content }),
    [currentChapter, content],
  );
  const [readerState, setReaderState] = useState<"rich" | "bible">(readerStyle);
  const [parsedContent] = useState(content);
  const initialContentLoaded = useRef(false);
  const [routeText, setRouteText] = useState("");

  useEffect(() => {
    setReaderState(readerStyle);
    setTimeout(() => (initialContentLoaded.current = true), 1000);
  }, [readerStyle]);

  const routeCurrentVerses = () => setRouteText(getTextContent());

  const renderChapterPicker = () => (
    <Select.Root
      value={currentChapter || ""}
      onValueChange={handleChapterChange}
    >
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

  const renderVersePicker = () => (
    <Select.Root value={currentVerse || ""} onValueChange={handleVerseChange}>
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

  const renderContent = () => {
    if (readerState === "rich" && typeof parsedContent === "string") {
      return (
        <pre
          className="whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: parsedContent }}
        />
      );
    }
    return (
      <div>
        <h3 className="text-lg font-bold">
          Chapter {currentChapter}, Verse {currentVerse}
        </h3>
        <p>
          {typeof content !== "string" &&
            content[currentChapter]?.[currentVerse]}
        </p>
      </div>
    );
  };

  const renderShadowSlice = () => {
    const currentSlice = getCurrentSlice();
    return (
      currentSlice.length > 0 && (
        <Flex
          justify="center"
          align="center"
          className="!flex-col text-sm mt-4 gap-4 p-2 rounded-md"
        >
          <div className="blurred-div max-w-[700px] text-center p-4 shadow-lg rounded-md">
            <p>
              {currentSlice.map((verse, index) => (
                <span
                  key={"bible-verse-" + index}
                  className={`${index == 0 && "font-bold"}`}
                >
                  {" "}
                  ({currentChapter}:{verse}){" "}
                  {typeof content !== "string" &&
                    content[currentChapter]?.[verse]}
                </span>
              ))}
            </p>
          </div>
          <Flex justify="center" align="center" className="gap-2">
            <IconButton
              variant="soft"
              disabled={
                parseInt(currentVerse) + SHADOW_COUNT >=
                chapterVerses.length - chapterVerses.indexOf(currentVerse) - 1
              }
              onClick={() => slideCurrentVerses()}
            >
              <ArrowBigRightDash />
            </IconButton>
            <SpeakIcon onClick={routeCurrentVerses} />
          </Flex>
        </Flex>
      )
    );
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
              {renderChapterPicker()}
              {renderVersePicker()}
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
              {renderContent()}
            </div>
            <IconButton onClick={() => navigateVerse("next")} variant="soft">
              <ArrowBigRight />
            </IconButton>
          </Flex>

          {renderShadowSlice()}
        </div>
      )}
    </div>
  );
};

export default Reader;
