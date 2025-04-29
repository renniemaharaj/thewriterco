import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useCallback, useMemo } from "react";
import { getChapterVerses } from "../bible/utils/reader";
import { SHADOW_COUNT } from "../bible/config";
import {
  setGlobalCurrentChapter,
  setGlobalCurrentVerse,
} from "../../app/ereader/ereaderSlice";

export const useContentReducers = () => {
  const dispatch = useDispatch();
  const { eContent, currentChapter, currentVerse } = useSelector(
    (state: RootState) => state.ereader,
  );
  const content = eContent.content;

  const chapterVerses = useMemo(() => {
    return getChapterVerses({ currentChapter, eContent: content });
  }, [currentChapter, content]);

  const getCurrentSlice = useCallback(() => {
    const startIndex = chapterVerses.indexOf(currentVerse);
    const endIndex = startIndex + SHADOW_COUNT + 1;
    return chapterVerses.slice(startIndex, endIndex);
  }, [chapterVerses, currentVerse]);

  const getTextContent = useCallback((): string => {
    if (!currentChapter || typeof content === "string") return "";
    const chapter = content[currentChapter];
    return getCurrentSlice()
      .map((verse) => chapter?.[verse])
      .filter(Boolean)
      .join(" ");
  }, [currentChapter, content, getCurrentSlice]);

  const slideCurrentVerses = useCallback(() => {
    const currentIndex = chapterVerses.indexOf(currentVerse);
    const newIndex = currentIndex + SHADOW_COUNT + 1;

    if (newIndex < chapterVerses.length) {
      const newVerse = chapterVerses[newIndex];
      if (newVerse) dispatch(setGlobalCurrentVerse(newVerse));
    }
  }, [chapterVerses, currentVerse, dispatch]);

  const handleChapterChange = useCallback(
    (chapter: string) => {
      dispatch(setGlobalCurrentChapter(chapter));
      dispatch(setGlobalCurrentVerse("1"));
    },
    [dispatch],
  );

  const handleVerseChange = useCallback(
    (verse: string) => {
      dispatch(setGlobalCurrentVerse(verse));
    },
    [dispatch],
  );

  const navigateVerse = useCallback(
    (direction: "prev" | "next", targetIndex?: number) => {
      const currentIndex = targetIndex ?? chapterVerses.indexOf(currentVerse);
      const newIndex =
        direction === "next" ? currentIndex + 1 : currentIndex - 1;

      if (newIndex < 0 && direction === "prev") {
        const chapterKeys = Object.keys(content);
        const chapterIndex = chapterKeys.indexOf(currentChapter);
        const prevChapter = chapterKeys[chapterIndex - 1];

        if (prevChapter && typeof content !== "string") {
          handleChapterChange(prevChapter);
          const lastVerse = Object.keys(content[prevChapter]).slice(-1)[0];
          handleVerseChange(lastVerse);
        }
      } else if (newIndex >= chapterVerses.length && direction === "next") {
        const chapterKeys = Object.keys(content);
        const chapterIndex = chapterKeys.indexOf(currentChapter);
        const nextChapter = chapterKeys[chapterIndex + 1];

        if (nextChapter) {
          handleChapterChange(nextChapter);
        }
      } else if (chapterVerses[newIndex]) {
        handleVerseChange(chapterVerses[newIndex]);
      }
    },
    [
      content,
      currentChapter,
      currentVerse,
      chapterVerses,
      handleChapterChange,
      handleVerseChange,
    ],
  );

  return {
    getCurrentSlice,
    getTextContent,
    slideCurrentVerses,
    navigateVerse,
    handleChapterChange,
    handleVerseChange,
  };
};
