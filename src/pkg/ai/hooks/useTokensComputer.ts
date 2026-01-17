import * as msgpack from "@msgpack/msgpack";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { buildConversation } from "../utils";

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
