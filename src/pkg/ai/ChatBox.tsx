import { Flex, Button } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
// import { useSendAskReqMutation } from "../../app/api/apiSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store.ts";

import { setOpenState } from "../../app/reader/readerSlice.ts";

// import { fromByteArray } from "base64-js";
import Input from "./Input.tsx";
import { setConversationTokens } from "../../app/chat/chatSlice.ts";
import Models from "./Models.tsx";
import View from "./View.tsx";
import { useAtomValue } from "jotai";
import { modelTyping } from "./atoms/typing.ts";
import useSendHandler from "./hooks/useSendHandler.ts";
import useTokensComputer from "./hooks/useTokensComputer.ts";

type ChatBoxProps = {
  className: string;
  scrollHandler: () => void;
};

const ChatBox = ({ className, scrollHandler }: ChatBoxProps) => {
  // const [sendAskReq] = useSendAskReqMutation();

  const chatMessages = useSelector((state: RootState) => state.chat.messages);
  const chatRef = useRef<HTMLDivElement>(null);
  const isModelTyping = useAtomValue(modelTyping);
  const [chatBoxWidth, setChatBoxWidth] = useState(0);

  const { computeTokens } = useTokensComputer();
  const { sendHandler } = useSendHandler();

  const dispatch = useDispatch();

  useEffect(() => {
    if (chatMessages.length > 0) scrollHandler();

    computeTokens().then((tokens) => dispatch(setConversationTokens(tokens)));
  }, [chatMessages, computeTokens, dispatch, scrollHandler]);

  useEffect(() => {
    const updateWidth = () => {
      if (chatRef.current) setChatBoxWidth(chatRef.current.offsetWidth);
    };

    updateWidth(); // Initial width calculation
    const resizeObserver = new ResizeObserver(updateWidth);
    if (chatRef.current) resizeObserver.observe(chatRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <Flex ref={chatRef} className={`${className} !pb-32`}>
      <View
        isTyping={isModelTyping}
        handleMessageSend={sendHandler}
        scrollHandler={scrollHandler}
      />

      <Input
        disabled={isModelTyping}
        handleSend={(text: string) => sendHandler(text, true, scrollHandler)}
        className={`!absolute md:bottom-[1rem] bottom-[0.1rem] animate-fade-in  blurred-div`}
        style={{ width: chatBoxWidth }}
        children={
          <Flex gap="2" className="!flex-row">
            <Flex align={"center"} className="!p-1 gap-2 !flex-wrap">
              <Models />
              <Button
                variant={"outline"}
                onClick={() => dispatch(setOpenState(true))}
              >
                Bible
              </Button>
            </Flex>
          </Flex>
        }
      />
    </Flex>
  );
};

export default ChatBox;
