import { useCallback } from "react";
import useResponseInterpreter from "./useResponseInterpreter";
import useDispatchMessage from "./useDispatchMessage";
import { Response } from "../types";

const useResponseParser = () => {
  const { interpret } = useResponseInterpreter();
  const { dispatchBlock, dispatchSystemMessage } = useDispatchMessage();
  const responseParser = useCallback(
    async (data: { response: string }) => {
      try {
        const modelResponseSchema = JSON.parse(data.response);

        // Ensure responseBlocks exist
        if (!modelResponseSchema.responseBlocks) {
          throw new Error("Invalid AI response format: Missing responseBlocks");
        }

        // Iterate through responseBlocks and handle different content types
        modelResponseSchema.responseBlocks.forEach((block: Response) => {
          const interpreted = interpret(block);
          if (interpreted) dispatchBlock(interpreted);
        });

        return true;
      } catch (error) {
        if (data.response) {
          dispatchSystemMessage(data.response);
          dispatchSystemMessage(error as string);
        }
      }
    },
    [interpret, dispatchBlock, dispatchSystemMessage],
  );

  return { responseParser };
};

export default useResponseParser;
