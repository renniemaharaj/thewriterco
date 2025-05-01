import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useCallback, useMemo, useEffect } from "react";
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

  const contentTitle = eContent.title;

  const chapterVerses = useMemo(() => {
    return getChapterVerses({ currentChapter, eContent: content });
  }, [currentChapter, content]);

  useEffect(() => {
    const isContentObject = typeof content === "object" && content !== null;

    if (!isContentObject) return;

    const chapterKeys = Object.keys(content);
    const isChapterValid = chapterKeys.includes(currentChapter);

    if (!isChapterValid) {
      dispatch(setGlobalCurrentChapter("1"));
      dispatch(setGlobalCurrentVerse("1"));
      return;
    }

    const currentChapterContent = content[currentChapter];
    const isVerseValid =
      typeof currentChapterContent === "object" &&
      currentChapterContent !== null &&
      Object.keys(currentChapterContent).includes(currentVerse);

    if (!isVerseValid) {
      dispatch(setGlobalCurrentVerse("1"));
    }
  }, [content, currentChapter, currentVerse, contentTitle, dispatch]);

  const narrate = useCallback((): string[] => {
    const content = eContent.content;
    if (typeof content === "string") return [content];

    const chapter = content[currentChapter];
    if (!chapter) return [];

    const verseKeys = Object.keys(chapter);
    const startIndex = verseKeys.indexOf(currentVerse);

    return verseKeys.slice(startIndex).map((verseKey) => chapter[verseKey]);
  }, [eContent, currentChapter, currentVerse]);

  const getCurrentSlice = useCallback(() => {
    const startIndex = chapterVerses.indexOf(currentVerse);
    const endIndex = startIndex + SHADOW_COUNT + 1;
    return chapterVerses.slice(startIndex, endIndex);
  }, [chapterVerses, currentVerse]);

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
    currentChapter,
    currentVerse,
    narrate,
    getCurrentSlice,
    slideCurrentVerses,
    navigateVerse,
    handleChapterChange,
    handleVerseChange,
  };
};
