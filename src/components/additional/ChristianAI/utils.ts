import { TaskAlterBookState } from "./types";

function sanitizeHtml(html: string) {
  // Replace broken or plain <br> tags with properly formatted ones
  return html.replace(/<.?br\s*\/?>/g, "<br />");
}

const taskExtractor = (
  response: string,
): { userResponse: string; tasks: TaskAlterBookState[] } => {
  const taskRegex = /\{([\s\S]*?)\}/g;

  const taskMatches = response.match(taskRegex);

  const tasks: TaskAlterBookState[] = taskMatches
    ? taskMatches
        .map((match) => {
          try {
            return JSON.parse(match) as TaskAlterBookState;
          } catch {
            return null;
          }
        })
        .filter((task): task is TaskAlterBookState => task !== null)
    : [];

  // Remove all task JSON objects from the response
  const userResponse = response.replace(taskRegex, "").trim();

  return { userResponse, tasks };
};

function longStringToParagraphs(str: string): string[] {
  const paragraphs = str.split(
    /(?:\r\n|\r|\n|<\s*br\s*\/?\s*>|<\/?\s*ols\s*>)/i,
  );
  const sanitizedParagraphs = paragraphs
    .map((para) => para.trim())
    .filter((para) => para.length > 0)
    .flatMap((para) => {
      const maxLength = 500;

      // Split the paragraph into sentences, preserving punctuation marks
      const sentences = para.match(/[^.!?]*[.!?]+("|')?\s*/g) || [para];

      const output = [];
      let currentChunk = "";

      for (const sentence of sentences) {
        if ((currentChunk + sentence).length <= maxLength) {
          currentChunk += sentence;
        } else {
          if (currentChunk) {
            output.push(currentChunk.trim());
          }
          currentChunk = sentence;
        }
      }

      if (currentChunk) {
        output.push(currentChunk.trim());
      }

      return output;
    });

  console.log(sanitizedParagraphs);
  return sanitizedParagraphs;
}

export { taskExtractor, longStringToParagraphs, sanitizeHtml };
