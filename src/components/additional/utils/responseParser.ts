export type ParseResult = {
  remaining: string;
  blocks: { language: string; code: string }[];
};

/**
 * Parses a string to extract code blocks with language specifiers
 * and returns the extracted parts along with the remaining text.
 *
 * @param input - The string containing the code blocks.
 * @returns An object with the remaining text and extracted code blocks.
 */
export function parseResponse(input: string): ParseResult {
  const codeBlockRegex = /```(\w+)\s*([\s\S]*?)```/g;
  let match: RegExpExecArray | null;
  let lastIndex = 0;
  let remaining = "";
  const blocks: { language: string; code: string }[] = [];

  // Iterate through each match
  while ((match = codeBlockRegex.exec(input)) !== null) {
    const language = match[1];
    const code = match[2];

    // Store the extracted code block and its language
    blocks.push({ language, code });

    // Add text before the current code block to the remaining text
    remaining += input.slice(lastIndex, match.index);
    lastIndex = codeBlockRegex.lastIndex;
  }

  // Append any remaining text after the last code block
  remaining += input.slice(lastIndex);

  return { remaining, blocks };
}
