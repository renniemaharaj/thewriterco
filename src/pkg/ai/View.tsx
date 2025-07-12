import { Button, Card, Flex } from "@radix-ui/themes";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { initialSuggestions } from "./configuration";
import Message from "./blocks/Message";
import Skeleton from "./blocks/Skeleton";
import useSendHandler from "./hooks/useSendHandler";

const View = ({
  isTyping,
  scrollHandler,
}: {
  isTyping: boolean;
  scrollHandler: () => void;
}) => {
  const chatState = useSelector((state: RootState) => state.chat);

  const { sendHandler } = useSendHandler();

  const suggestionHandler = useCallback(
    (msg: string) =>
      sendHandler({
        msg: msg,
        defaultSending: true,
        scrollHandler: scrollHandler,
      }),
    [sendHandler, scrollHandler],
  );

  return (
    <Card
      className={`${isTyping && "animate-pulse"} flex-col !w-full !h-fit !pb-[9rem] mx-auto my-auto`}
      variant="ghost"
    >
      {chatState.messages.length === 0 && (
        <Flex className={`gap-1 px-8 !justify-center my-8 !flex-wrap`}>
          {initialSuggestions.map((msg, index) => (
            <Button
              key={index}
              variant="soft"
              className="cursor-pointer"
              onClick={() => suggestionHandler(msg)}
              disabled={isTyping}
            >
              {msg}
            </Button>
          ))}
        </Flex>
      )}

      {chatState.messages.map((block, index) => (
        <React.Fragment key={index}>
          <Flex className="w-[99%]">
            <Message
              block={block}
              scrollHandler={scrollHandler}
              onMount={scrollHandler}
            />
          </Flex>
        </React.Fragment>
      ))}

      {isTyping && (
        <React.Fragment>
          <Flex className="w-[99%] !mx-auto !my-10">
            <Skeleton />
          </Flex>
        </React.Fragment>
      )}
    </Card>
  );
};

export default View;
