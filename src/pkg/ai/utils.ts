import type { Block, Code, Exchange, MarkupResponse, Scripture } from "./types";

// Convert scripture block to string
export function scriptureToStr(block: Scripture) {
  return JSON.stringify(Array.isArray(block.verses) ? block.verses.join(" ") : block.verses);
}

// Build conversation for AI
export async function buildConversation(
  primaryBlocks: Block[],
  additionalExchange?: Exchange,
): Promise<Exchange[]> {
  const conversation = primaryBlocks
    .filter(block => block.role !== "system")
    .map(block => {
      switch (block.type) {
        case "markup":
          return {
            role: block.role,
            content: (block.content as MarkupResponse).markupContent,
          };
        case "code":
          return {
            role: block.role,
            content: (block.content as Code).codeContent,
          };
        case "scripture":
          return {
            role: block.role,
            content: scriptureToStr(block.content as Scripture),
          };
        default:
          throw new Error(`Unknown block type: ${block.type}`);
      }
    });

  if (additionalExchange) {
    conversation.push(additionalExchange);
  }

  return conversation;
}
