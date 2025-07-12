import { useCallback } from "react";
import * as msgpack from "@msgpack/msgpack";
import { buildConversation } from "../utils";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

const useTokensComputer = () => {
  const chatMessages = useSelector((state: RootState) => state.chat.messages);
  const computeTokens = useCallback(async () => {
    const conversation = await buildConversation(chatMessages);
    const msgPackData = msgpack.encode(conversation);
    return msgPackData.length;
  }, [chatMessages]);
  return { computeTokens };
};

export default useTokensComputer;
