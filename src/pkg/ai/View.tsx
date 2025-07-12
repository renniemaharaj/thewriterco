import { Button, Card, Flex } from "@radix-ui/themes";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { initialSuggestions } from "./configuration";
import Message from "./blocks/Message";
import Skeleton from "./blocks/Skeleton";
import useSendHandler from "./hooks/useSendHandler";
import { useAtomValue } from "jotai";
import { modelTyping } from "./atoms/typing";
import { ScrollHandler } from "./hooks/types";

const View = ({ scrollHandler }: { scrollHandler: ScrollHandler }) => {
  const chatState = useSelector((state: RootState) => state.chat);

  const isModelTyping = useAtomValue(modelTyping);

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
      className={`${isModelTyping && "animate-pulse"} flex-col !w-full !h-fit !pb-[9rem] mx-auto my-auto`}
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
              disabled={isModelTyping}
            >
              {msg}
            </Button>
          ))}
        </Flex>
      )}

      {chatState.messages.map((block, index) => (
        <React.Fragment key={index}>
          <Flex>
            <Message
              block={block}
              scrollHandler={scrollHandler}
              onMount={scrollHandler}
            />
          </Flex>
        </React.Fragment>
      ))}

      {isModelTyping && (
        <React.Fragment>
          <Flex className="!mx-auto !my-10">
            <Skeleton />
          </Flex>
        </React.Fragment>
      )}
    </Card>
  );
};

export default View;
