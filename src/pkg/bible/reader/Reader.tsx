import { useEffect, useRef, useMemo, useCallback } from "react";
import { Flex, IconButton, Tooltip } from "@radix-ui/themes";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { ArrowBigLeft, ArrowBigRight, ArrowBigRightDash } from "lucide-react";
import { getChapterVerses } from "../utils/reader";
import { useContentReducers } from "../../hooks/useContentReducers";
import {
  useGlobalShortcuts,
  registerShortcut,
  unregisterShortcut,
} from "../../hooks/useGlobalShortcuts";
import Shadow from "./Shadow";
import Current from "./Current";
import { SHADOW_COUNT } from "../config";
import Changer from "./Changer";
import Header from "./Header";
import useLocalStorage from "../../hooks/useLocalStorage";

const Reader = ({
  hidePicker,
}: {
  hidePicker?: boolean;
  onSpeechProgress?: (chapter: string, verse: string) => void;
}) => {
  const eReaderState = useSelector((state: RootState) => state.ereader);

  const [, setValue] = useLocalStorage("readerData", eReaderState);

  const {
    isOpen,
    currentChapter: reduxChapter,
    currentVerse: reduxVerse,
    eContent,
  } = eReaderState;

  const content = eContent.content;

  const {
    currentChapter,
    currentVerse,

    getCurrentSlice,
    slideCurrentVerses,
    handleChapterChange,
    handleVerseChange,
    navigateVerse,
  } = useContentReducers();

  const initialContentLoaded = useRef(false);

  // Sync Redux state into local state without triggering updates every render
  useEffect(() => {
    if (!initialContentLoaded.current) {
      initialContentLoaded.current = true;
    }
  }, [reduxChapter, reduxVerse]);

  // Chapter Verses for Select Picker
  const chapterVerses = useMemo(
    () =>
      getChapterVerses({ currentChapter: currentChapter, eContent: content }),
    [currentChapter, content],
  );

  useGlobalShortcuts(); // Mount global listener once

  useEffect(() => {
    const nextVerseShortcut = {
      key: "ArrowRight",
      action: (e: KeyboardEvent) => {
        if (eReaderState.isOpen) {
          navigateVerse("next");
          e.preventDefault();
        }
      },
    };

    const prevVerseShortcut = {
      key: "ArrowLeft",
      action: (e: KeyboardEvent) => {
        if (eReaderState.isOpen) {
          navigateVerse("prev");
          e.preventDefault();
        }
      },
    };

    registerShortcut(nextVerseShortcut);
    registerShortcut(prevVerseShortcut);

    return () => {
      unregisterShortcut(nextVerseShortcut);
      unregisterShortcut(prevVerseShortcut);
    };
  }, [navigateVerse, eReaderState]);

  const hasFiveVersesLeft = useCallback(() => {
    const currentIndex = parseInt(currentVerse, 10);
    return currentIndex + SHADOW_COUNT < chapterVerses.length;
  }, [currentVerse, chapterVerses]);

  useEffect(() => {
    setValue(eReaderState);
  }, [eReaderState]);

  return (
    <div
      className={`blurred-div fixed left-0 shadow-lg overflow-auto z-20 no-scrollbar ${
        isOpen
          ? "h-full w-full bottom-0"
          : "bottom-2 w-auto left-[50%] translate-x-[-50%]"
      }`}
    >
      <Header
        hidePicker={hidePicker ?? false}
        isOpen={isOpen}
        // onSpeechProgress={handleSpeechProgress}
      />

      {isOpen && (
        <div className="!flex-col p-4 space-y-4">
          <Changer
            content={content}
            chapterVerses={chapterVerses}
            currentChapter={currentChapter}
            currentVerse={currentVerse}
            handleVerseChange={handleVerseChange}
            handleChapterChange={handleChapterChange}
          />

          <Flex className="!justify-center !items-center space-x-4">
            <Tooltip content="⌘ Left Key">
              <IconButton onClick={() => navigateVerse("prev")} variant="soft">
                <ArrowBigLeft />
              </IconButton>
            </Tooltip>

            <Current
              getCurrentSlice={getCurrentSlice}
              currentChapter={currentChapter}
              content={content}
            />

            <Tooltip content="⌘ Right Key">
              <IconButton onClick={() => navigateVerse("next")} variant="soft">
                <ArrowBigRight />
              </IconButton>
            </Tooltip>
          </Flex>

          <Shadow
            currentSlice={getCurrentSlice()}
            currentVerse={currentVerse}
            currentChapter={currentChapter}
            chapterVerses={chapterVerses}
            content={content}
            slideCurrentVerses={slideCurrentVerses}
          />

          <Flex justify="center" align="center" className="gap-2">
            <Tooltip content="Next 5 Verses">
              <IconButton
                variant="soft"
                disabled={!hasFiveVersesLeft()}
                onClick={() => slideCurrentVerses()}
              >
                <ArrowBigRightDash />
              </IconButton>
            </Tooltip>
          </Flex>
        </div>
      )}
    </div>
  );
};

export default Reader;
