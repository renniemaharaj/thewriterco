import { useState, useEffect } from "react";
import { documentRepoPath } from "./presets";

export type GitHubFile = {
  name: string;
  path: string;
  download_url: string;
  type: "file" | "dir";
};

const GITHUB_API_BASE = "https://api.github.com/repos";
const RATE_LIMIT_INTERVAL_MS = 30000; // 30 seconds

// Cache of folder responses with timestamp
const cache: Record<string, { timestamp: number; result: string[] }> = {};

const fetchGitHubFolder = async (folderPath: string): Promise<string[]> => {
  const now = Date.now();
  const cached = cache[folderPath];

  // If recent cache exists, return it
  if (cached && now - cached.timestamp < RATE_LIMIT_INTERVAL_MS) {
    console.log(`Using cached result for '${folderPath}'`);
    return cached.result;
  }

  const apiUrl = `${GITHUB_API_BASE}/${documentRepoPath}/contents/${folderPath}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`Failed to list folder: ${response.statusText}`);
  }

  const files: GitHubFile[] = await response.json();
  const result = files.map((f) => f.name);

  // Store result in cache
  cache[folderPath] = { timestamp: now, result };
  return result;
};

export function useFetchGitDir(folderPath: string) {
  const [dir, setDir] = useState<string[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      console.log(`Fetching folder contents for: ${folderPath}`);
      try {
        setLoading(true);
        const fileNames = await fetchGitHubFolder(folderPath);
        if (!isCancelled) {
          setDir(fileNames);
          setError(null);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Error fetching folder contents:", error);
          setError(
            error instanceof Error
              ? error
              : new Error("An unknown error occurred"),
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
  }, [folderPath]);

  return { dir, error, loading };
}
