import { useState, useEffect, useCallback } from "react";
import fetchGitBlob from "./useFetchGitBlob";
import { documentRepoPath } from "./presets";

interface UseGitFetchDocumentResult {
  content: string | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useGitFetchDocument = ({
  fetchPath,
  filename,
}: {
  filename?: string;
  fetchPath?: string;
}): UseGitFetchDocumentResult => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDocument = useCallback(async () => {
    if (!fetchPath || !filename) {
      setError(new Error("File path and name is required"));
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const fullPath = `${documentRepoPath}/main/${fetchPath}`.replace(
        /\/+/g,
        "/",
      );
      const blob = await fetchGitBlob(fullPath, filename, "html");
      setContent(blob);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch document"),
      );
      setContent(null);
    } finally {
      setLoading(false);
    }
  }, [fetchPath, filename]);

  useEffect(() => {
    fetchDocument();
  }, [fetchPath, fetchDocument]);

  return { content, loading, error, refetch: fetchDocument };
};
