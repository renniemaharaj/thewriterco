import { useState, useEffect } from "react";
import { documentRepoPath } from "./presets";

export type GitHubFile = {
  name: string;
  path: string;
  download_url: string;
  type: "file" | "dir";
};

const GITHUB_API_BASE = "https://api.github.com/repos";

const fetchGitHubFolder = async (folderPath: string) => {
  const apiUrl = `${GITHUB_API_BASE}/${documentRepoPath}/contents/${folderPath}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`Failed to list folder: ${response.statusText}`);
  }

  const files: GitHubFile[] = await response.json();
  return files.map((f) => f.name);
};

export function useFetchGitDir(folderPath: string) {
  const [dir, setDir] = useState<string[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fileNames = await fetchGitHubFolder(folderPath);
        setDir(fileNames);
        setError(null);
      } catch (error) {
        console.error("Error fetching folder contents:", error);
        setError(
          error instanceof Error ? error : new Error("An error occurred"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [folderPath]);

  return { dir, error, loading };
}
