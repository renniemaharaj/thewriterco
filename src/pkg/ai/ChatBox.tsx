import { Flex, Button } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { setOpenState } from "../../app/reader/readerSlice.ts";

import { useAtomValue } from "jotai";
import { modelTyping } from "./atoms/typing.ts";
import useSendHandler from "./hooks/useSendHandler.ts";

// import { useSendAskReqMutation } from "../../app/api/apiSlice.ts";
// import { fromByteArray } from "base64-js";

import Input from "./Input.tsx";
import Models from "./Models.tsx";
import View from "./View.tsx";
import { ScrollHandler } from "./hooks/types.ts";

const ChatBox = ({
  className,
  scrollHandler,
}: {
  className: string;
  scrollHandler: ScrollHandler;
}) => {
  // const [sendAskReq] = useSendAskReqMutation();
  const chatRef = useRef<HTMLDivElement>(null);
  const isModelTyping = useAtomValue(modelTyping);
  const [chatBoxWidth, setChatBoxWidth] = useState(0);

  const { sendHandler } = useSendHandler();

  const dispatch = useDispatch();

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
      <View scrollHandler={scrollHandler} />

      <Input
        disabled={isModelTyping}
        handleSend={(msg: string) => sendHandler({ msg, scrollHandler })}
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
