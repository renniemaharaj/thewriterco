import { Block, Code, Exchange, MarkupResponse, Scripture } from "./types";

// Build conversation for AI
export async function buildConversation(
  primaryBlocks: Block[],
  additionalExchange?: Exchange,
): Promise<Exchange[]> {
  const conversation = primaryBlocks.map((block) => {
    if (block.type === "markup") {
      return {
        role: block.role,
        content: (block.content as MarkupResponse).markupContent,
      };
    } else if (block.type === "code") {
      return {
        role: block.role,
        content: (block.content as Code).codeContent,
      };
    } else {
      return {
        role: block.role,
        content: (block.content as Scripture).verses.toString(),
      };
    }
  });

  if (additionalExchange) {
    conversation.push(additionalExchange);
  }

  return conversation;
}
