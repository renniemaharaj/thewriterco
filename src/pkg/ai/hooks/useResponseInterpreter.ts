import { Block, Code, MarkupResponse, Response, Scripture } from "../types";

const useResponseInterpreter = () => {
  const interpret = (block: Response) => {
    switch (block.type) {
      case "markup":
        return {
          role: "model",
          type: "markup",
          content: block.content as MarkupResponse,
        } as Block;

      case "scripture":
        return {
          role: "model",
          type: "scripture",
          content: block.content as Scripture,
        } as Block;

      case "code":
        return {
          role: "model",
          type: "code",
          content: block.content as Code,
        } as Block;

      default:
        console.warn(`Unknown response block type: ${block.type}`);
    }
  };
  return { interpret };
};

export default useResponseInterpreter;
