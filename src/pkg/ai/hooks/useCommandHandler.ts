import { useSetAtom } from "jotai";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { clearMessages, nukeSystemMessages } from "../../../app/chat/chatSlice";
import { maxTokensAllowed } from "../atoms/tokens";
import type { Command } from "./types";
import useDispatchMessage from "./useDispatchMessage";

const useCommandHandler = () => {
  const { dispatchSystemMessage } = useDispatchMessage();
  const setMaxTokens = useSetAtom(maxTokensAllowed);
  const dispatch = useDispatch();
  const commandHandler = useCallback(
    ({ command, args }: Command) => {
      switch (command) {
        case "clear":
          dispatch(clearMessages());
          break;

        case "nuke":
          dispatch(nukeSystemMessages());
          break;

        case "reset":
          dispatch(clearMessages());
          location.reload();
          break;

        case "tokens":
          if (args.length > 0) {
            const newMaxTokens = Number.parseInt(args[0]);
            if (newMaxTokens > 0) {
              setMaxTokens(newMaxTokens);
            }
          }
          break;
        default:
          dispatchSystemMessage("Unknown command");
      }
    },
    [dispatch, setMaxTokens, dispatchSystemMessage],
  );
  return { commandHandler };
};
export default useCommandHandler;
