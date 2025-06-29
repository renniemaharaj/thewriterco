import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { documentRepoPath } from "./presets";
import { RootState } from "../../../app/store";
import { setCache } from "../../../app/cache/cacheSlice";
import useLocalStorage from "../useLocalStorage";
import { initialState } from "../../../app/cache/config";

export type GitHubFile = {
  name: string;
  path: string;
  download_url: string;
  type: "file" | "dir";
};

const GITHUB_API_BASE = "https://api.github.com/repos";
const RATE_LIMIT_INTERVAL_MS = 30000;

export function useFetchGitDir(folderPath: string) {
  const dispatch = useDispatch();
  const globalCache = useSelector((state: RootState) => state.cache);
  const [dir, setDir] = useState<string[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  const [, setValue] = useLocalStorage("cacheData", initialState);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      const now = Date.now();
      const cachedEntry = globalCache[folderPath];

      if (cachedEntry && now - cachedEntry.timestamp < RATE_LIMIT_INTERVAL_MS) {
        // console.log(`Using Redux cache for '${folderPath}'`);
        setDir(cachedEntry.result);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // console.log(`Fetching from GitHub for '${folderPath}'`);
        const apiUrl = `${GITHUB_API_BASE}/${documentRepoPath}/contents/${folderPath}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Failed to list folder: ${response.statusText}`);
        }

        const files: GitHubFile[] = await response.json();
        const result = files.map((f) => f.name);

        if (!isCancelled) {
          setDir(result);
          setError(null);

          // Push to Redux cache
          dispatch(
            setCache({ key: folderPath, value: { result, timestamp: now } }),
          );
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("Error fetching folder contents:", err);
          setError(
            err instanceof Error ? err : new Error("An unknown error occurred"),
          );
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [folderPath, globalCache, dispatch]);

  useEffect(() => {
    setValue(globalCache);
  }, [globalCache]);

  return { dir, error, loading };
}
