import { Block, Code, Exchange, MarkupResponse, Scripture } from "./types";

// Build conversation for AI
export async function buildConversation(
  primaryBlocks: Block[],
  additionalExchange?: Exchange,
): Promise<Exchange[]> {
  const conversation = primaryBlocks
    .filter((block) => block.role !== "system")
    .map((block) => {
      switch (block.type) {
        case "markup":
          if (!isMarkupResponse(block.content)) {
            throw new Error("Invalid markup content");
          }
          return {
            role: block.role,
            content: block.content.markupContent,
          };
        case "code":
          if (!isCode(block.content)) {
            throw new Error("Invalid code content");
          }
          return {
            role: block.role,
            content: block.content.codeContent,
          };
        case "scripture":
          if (!isScripture(block.content)) {
            throw new Error("Invalid scripture content");
          }
          return {
            role: block.role,
            content: Array.isArray(block.content.verses)
              ? block.content.verses.join(" ")
              : block.content.verses,
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

// Type guards
/* eslint-disable @typescript-eslint/no-explicit-any */
function isMarkupResponse(content: any): content is MarkupResponse {
  return content && typeof content.markupContent === "string";
}

function isCode(content: any): content is Code {
  return content && typeof content.codeContent === "string";
}

function isScripture(content: any): content is Scripture {
  return (
    content &&
    (Array.isArray(content.verses) || typeof content.verses === "string")
  );
}
