import { useDispatch } from "react-redux";
import { addMessage } from "../../../app/chat/chatSlice";
import { Block } from "../types";

const useDispatchMessage = () => {
  const dispatch = useDispatch();

  const dispatchBlock = (block: Block) => {
    dispatch(addMessage(block));
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
