import { useDispatch } from "react-redux";
import { addMessage, setConversationTokens } from "../../../app/chat/chatSlice";
import { Block } from "../types";
import useTokensComputer from "./useTokensComputer";

const useDispatchMessage = () => {
  const { computeTokens } = useTokensComputer();
  const dispatch = useDispatch();

  const dispatchBlock = (block: Block) => {
    dispatch(addMessage(block));
    computeTokens().then((tokens) => dispatch(setConversationTokens(tokens)));
  };

  const dispatchUserMessage = (msg: string) => {
    dispatchBlock({
      role: "user",
      type: "markup",
      content: {
        type: "markup",
        markupContent: msg,
      },
    });
  };

  const dispatchSystemMessage = (msg: string) => {
    dispatchBlock({
      role: "system",
      type: "markup",
      content: {
        type: "markup",
        markupContent: msg,
      },
    });
  };

  return { dispatchBlock, dispatchUserMessage, dispatchSystemMessage };
};
export default useDispatchMessage;
