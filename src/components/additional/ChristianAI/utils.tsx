import MonacoEditor from "../../MonacoEditor";
import { Block } from "./types";
import { longStringToParagraphs, sanitizeHtml, taskExtractor } from "./utils";

function hasTextContent(text: string) {
  const div = document.createElement("div");
  div.innerHTML = text;

  // Check for meaningful, non-whitespace text
  const textContent = div.textContent?.trim();
  if (!textContent) return false;
  return textContent?.length > 0;
}

function removeFailedBR(text: string) {
  return text.replace(/<br\s*\/?>/gi, "");
}

function parseCodeBlocks(response: string) {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const blocks: Block[] = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(response)) !== null) {
    // Extract text before the current code block
    const rawTextBefore = response.slice(lastIndex, match.index);
    const processedTextBefore = taskExtractor(rawTextBefore).userResponse;

    if (processedTextBefore) {
      const paragraphs = longStringToParagraphs(
        removeFailedBR(processedTextBefore),
      );
      paragraphs.forEach((para) => {
        if (hasTextContent(para)) {
          blocks.push({
            type: "text",
            content: para,
            language: "plaintext",
            jsxElem: (
              <div
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(para) }}
                style={{ padding: "5px" }}
              />
            ),
            sender: "AI",
          });
        }
      });
    }

    // Process code block
    const language = match[1];
    const codeContent = match[2].trim();

    // Skip task-like JSON blocks
    try {
      const parsedJSON = JSON.parse(codeContent);
      if (parsedJSON && parsedJSON.task) {
        lastIndex = match.index + match[0].length;
        continue;
      }
    } catch (e: unknown) {
      console.log(e);
      // Not a task JSON; proceed as regular code block.
    }

    // Add code block
    blocks.push({
      type: "code",
      language,
      content: codeContent,
      jsxElem: (
        <MonacoEditor language={language} code={codeContent} height={300} />
      ),
      sender: "AI",
    });

    lastIndex = match.index + match[0].length;
  }

  // Handle trailing text
  const remainingText = response.slice(lastIndex);
  const processedRemainingText = taskExtractor(
    removeFailedBR(remainingText),
  ).userResponse;

  if (processedRemainingText) {
    const paragraphs = longStringToParagraphs(processedRemainingText);
    paragraphs.forEach((para) => {
      if (hasTextContent(para)) {
        blocks.push({
          type: "text",
          content: para,
          language: "plaintext",
          jsxElem: (
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(para) }} />
          ),
          sender: "AI",
        });
      }
    });
  }

  return blocks;
}

export { parseCodeBlocks };
