import { Button, Card, Flex } from "@radix-ui/themes";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { initialSuggestions } from "./configuration";
import Message from "./blocks/Message";
import { MessageAction } from "./Message";
import { nukeSystemMessages } from "../../app/chat/chatSlice";
import Skeleton from "./blocks/Skeleton";

const View = ({
  isTyping,
  handleMessageSend,
  scrollMessageBoxToBottom,
}: {
  isTyping: boolean;
  handleMessageSend: (s: string, d?: boolean) => void;
  scrollMessageBoxToBottom: () => void;
}) => {
  const [suggestions, setSuggestions] = useState<string[]>(initialSuggestions);

  const chatState = useSelector((state: RootState) => state.chat);

  const dispatch = useDispatch();

  const handleSuggestionClick = useCallback(
    (msg: string) => {
      setSuggestions((prev) => prev.filter((suggestion) => suggestion !== msg));
      handleMessageSend(msg);
    },
    [handleMessageSend, setSuggestions],
  );

  const handleActions = useCallback(
    (action: MessageAction) => {
      switch (action) {
        case "fix":
          handleMessageSend(
            "-@here Respond correctly, in defined schema. Validation failing.",
            false,
          );
          dispatch(nukeSystemMessages());

          break;
      }
    },
    [handleMessageSend, dispatch],
  );
  return (
    <Card
      className={`${isTyping && "animate-pulse"} flex-col !w-full !h-fit !pb-[9rem] my-auto`}
      variant="ghost"
    >
      {chatState.messages.length === 0 && (
        <Flex className={`gap-1 px-8 mb-4 pt-2 !justify-center !flex-wrap`}>
          {suggestions.map((msg, index) => (
            <Button
              key={index}
              variant="soft"
              className="cursor-pointer"
              onClick={() => handleSuggestionClick(msg)}
              disabled={isTyping}
            >
              {msg}
            </Button>
          ))}
        </Flex>
      )}

      {chatState.messages.map((block, index) => (
        <React.Fragment key={index}>
          <Flex className="w-[99%] !max-auto !mx-auto">
            <Message
              block={block}
              onAnimated={scrollMessageBoxToBottom}
              handleActions={handleActions}
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
