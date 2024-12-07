type FetchGitBlob = (fileName: string) => Promise<string>;

const fetchGitBlob: FetchGitBlob = async (fileName) => {
  try {
    // Construct the GitHub raw URL
    const repoUrl =
      "https://raw.githubusercontent.com/renniemaharaj/kjv-bible/main";
    const fileUrl = `${repoUrl}/${fileName}.json`;

    // Fetch the file content
    const response = await fetch(fileUrl);

    // Check for successful response
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    // Return the file content as text
    const fileContent = await response.text();
    return fileContent;
  } catch (error) {
    console.error("Error fetching file from GitHub:", error);
    throw error;
  }
};

export default fetchGitBlob;
