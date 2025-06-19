import { useDispatch } from "react-redux";
import { useState, useCallback } from "react";
import { EBook } from "../../app/ereader/types";
import fetchGitBlob from "./data/useFetchGitBlob";
import { kvpRepoPath } from "./data/presets";
import { setEBook, setOpenState } from "../../app/ereader/ereaderSlice";

const useBible = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [content, setContent] = useState<EBook | null>(null);

  const handleBookOpen = useCallback(
    async (title: string) => {
      setIsLoading(true);
      setError(null);

      const date = Date.now().toString();

      try {
        const content = await fetchGitBlob(
          kvpRepoPath + "/main",
          title,
          "json",
        );
        const parsedContent = JSON.parse(content);

        const newEBook = {
          title,
          content: parsedContent,
          date,
        } as EBook;

        setContent(newEBook);
        dispatch(setEBook(newEBook));
        setTimeout(() => dispatch(setOpenState(true)), 100);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to fetch book content"),
        );
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch],
  );

  return {
    handleBookOpen,
    isLoading,
    error,
    content,
  };
};

export default useBible;
