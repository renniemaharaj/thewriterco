import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setEBook, setOpenState } from "../../app/reader/readerSlice";
import type { EBook } from "../../app/reader/types";
import { kvpRepoPath } from "./data/presets";
import fetchGitBlob from "./data/useFetchGitBlob";

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
        const content = await fetchGitBlob(kvpRepoPath + "/main", title, "json");
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
        setError(err instanceof Error ? err : new Error("Failed to fetch book content"));
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
