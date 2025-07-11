import { Flex, Button } from "@radix-ui/themes";
import {
  useCallback,
  useImperativeHandle,
  useEffect,
  useRef,
  forwardRef,
  useState,
} from "react";
// import { useSendAskReqMutation } from "../../app/api/apiSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store.ts";

import { setOpenState } from "../../app/reader/readerSlice.ts";

import * as msgpack from "@msgpack/msgpack";
// import { fromByteArray } from "base64-js";
import Input from "./Input.tsx";
import { setConversationTokens } from "../../app/chat/chatSlice.ts";
import { buildConversation } from "./utils.ts";
import Models from "./Models.tsx";
import View from "./View.tsx";
import { useAtomValue } from "jotai";
import { modelTyping } from "./atoms/typing.ts";
import useSendHandler from "./hooks/useSendHandler.ts";

type ChatBoxProps = {
  className: string;
  scrollHandler: () => void;
};

const ChatBox = forwardRef(
  ({ className, scrollHandler }: ChatBoxProps, ref) => {
    // const [sendAskReq] = useSendAskReqMutation();

    const chatState = useSelector((state: RootState) => state.chat);

    const chatRef = useRef<HTMLDivElement>(null);
    const [chatBoxRespectiveWidth, setChatBoxRespectiveWidth] = useState(0);

    const isModelTyping = useAtomValue(modelTyping);

    const { sendHandler } = useSendHandler();

    const dispatch = useDispatch();

    // Expose methods to parent via ref
    useImperativeHandle(ref, () => ({
      sendHandler,
    }));

    const computeTokens = useCallback(async () => {
      const conversation = await buildConversation(chatState.messages);
      const msgPackData = msgpack.encode(conversation);
      return msgPackData.length;
    }, [chatState.messages]);

    useEffect(() => {
      if (chatState.messages.length > 0) {
        scrollHandler();
      }

      computeTokens().then((tokens) => {
        dispatch(setConversationTokens(tokens));
      });
    }, [chatState.messages, computeTokens, dispatch, scrollHandler]);

    useEffect(() => {
      const updateWidth = () => {
        if (chatRef.current) {
          setChatBoxRespectiveWidth(chatRef.current.offsetWidth);
        }
      };

      updateWidth(); // Initial width calculation
      const resizeObserver = new ResizeObserver(updateWidth);
      if (chatRef.current) {
        resizeObserver.observe(chatRef.current);
      }
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
          handleRecieve={(text: string) =>
            sendHandler(text, true, scrollHandler)
          }
          className={`!absolute md:bottom-[1rem] bottom-[0.1rem] animate-fade-in  blurred-div`}
          style={{ width: chatBoxRespectiveWidth }}
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
  },
);

export default ChatBox;
