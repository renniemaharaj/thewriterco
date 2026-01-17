type FetchGitBlob = (repoUrl: string, fileName: string, fileExtension: string) => Promise<string>;

const fetchGitBlob: FetchGitBlob = async (repoUrl, fileName, fileExtension) => {
  try {
    // Construct the GitHub raw URL
    const rawBlobUrl = "https://raw.githubusercontent.com";
    const fileUrl = `${rawBlobUrl}/${repoUrl}/${fileName}.${fileExtension}`;

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
