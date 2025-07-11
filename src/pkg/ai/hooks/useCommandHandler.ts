import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { clearMessages, nukeSystemMessages } from "../../../app/chat/chatSlice";
import useDispatchMessage from "./useDispatchMessage";
import { useSetAtom } from "jotai";
import { maxTokensAllowed } from "../atoms/tokens";

const useCommandHandler = () => {
  const { dispatchSystemMessage } = useDispatchMessage();
  const setMaxTokens = useSetAtom(maxTokensAllowed);
  const dispatch = useDispatch();
  const commandHandler = useCallback(
    (command: string, args: string[]) => {
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
            const newMaxTokens = parseInt(args[0]);
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
