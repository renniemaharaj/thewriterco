import { goBackendRepo } from "../../hooks/data/presets";

const rawBlobUrl = "https://raw.githubusercontent.com";

export const getSystemInstructions = async () => {
  const fileUrl = `${rawBlobUrl}/${goBackendRepo}/main/${"instructions"}.${"txt"}`;

  // Fetch the file content
  const response = await fetch(fileUrl);
  return response.text();
};
