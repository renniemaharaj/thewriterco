import { useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { prompt } from "../../firebase/ai/ai";
import { maxTokensAllowed } from "../atoms/tokens";
import { modelTyping } from "../atoms/typing";
import { buildConversation } from "../utils";
import type { SendHandler } from "./types";
import useBuildContexts from "./useBuildContexts";
import useCommandHandler from "./useCommandHandler";
import useDispatchMessage from "./useDispatchMessage";
import useResponseParser from "./useResponseParser";

const useSendHandler = () => {
  const chatState = useSelector((state: RootState) => state.chat);
  const { dispatchUserMessage, dispatchSystemMessage } = useDispatchMessage();
  const maxTokens = useAtomValue(maxTokensAllowed);
  const { buildContexts } = useBuildContexts();
  const { responseParser } = useResponseParser();
  const setIsModelTyping = useSetAtom(modelTyping);

  const { commandHandler } = useCommandHandler();

  const sendHandler = useCallback(
    async ({ msg, defaultSending = true, scrollHandler }: SendHandler) => {
      if (!msg.trim()) return;

      if (msg.startsWith("/")) {
        const arg = msg.replace("/", "").split(" ");
        commandHandler({ command: arg[0], args: arg.slice(1) });
        return;
      }

      if (defaultSending) {
        dispatchUserMessage(msg);
      }

      if (chatState.conversationTokens > maxTokens) {
        if (defaultSending && chatState.conversationMode !== "none") {
          dispatchSystemMessage("Conversation limit reached, please start a new chat");
          return;
        }
      }

      scrollHandler();
      setIsModelTyping(true);

      // Attach additional context to the message
      const context = buildContexts();

      // Build request schema
      const requestSchema = {
        encoded: "",
        context,
      };

      let conversation;

      if (chatState.conversationMode === "exchange") {
        conversation = await buildConversation(chatState.messages, {
          role: "user",
          content: msg,
        });
      } else {
        conversation = await buildConversation([], {
          role: "user",
          content: msg,
        });
      }

      // const msgPackData = msgpack.encode(conversation);
      // const base64String = fromByteArray(new Uint8Array(msgPackData));

      // askSchema.encoded = base64String;

      requestSchema.encoded = JSON.stringify(conversation);

      let data = { response: "" };

      //Request model response
      try {
        // data = await sendAskReq({
        //   message: JSON.stringify(askSchema),
        // }).unwrap();
        const result = await prompt(JSON.stringify(requestSchema));
        if (result) data = { response: result };
      } catch (error) {
        dispatchSystemMessage("A connection error occurred or you are required to wait 15 seconds");
        dispatchSystemMessage(error as string);
        return; // Exit early to prevent further execution
      } finally {
        setIsModelTyping(false);
      }

      //Parse the response data
      try {
        await responseParser(data);
      } catch (error) {
        dispatchSystemMessage("An error occurred while processing the response. Please try again");
        dispatchSystemMessage(error as string);
      } finally {
        setIsModelTyping(false);
      }
    },
    [
      dispatchSystemMessage,
      dispatchUserMessage,
      responseParser,
      commandHandler,
      setIsModelTyping,
      buildContexts,
      chatState,
      maxTokens,
      // sendAskReq,
    ],
  );
  return { sendHandler };
};
export default useSendHandler;
