import { Button, Card, Flex, Text } from "@radix-ui/themes";
import { ShieldAlertIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { clearMessages } from "../../../app/chat/chatSlice";
import { Block, MarkupResponse } from "../types";
import useActionHandler from "../hooks/useActionHandler";

const System = ({
  block,
  scrollHandler,
}: {
  block: Block;
  scrollHandler: () => void;
}) => {
  const { actionHandler } = useActionHandler();
  const dispatch = useDispatch();
  return (
    <Card
      variant="ghost"
      className="!flex !flex-col !items-center !gap-2 max-w-[300px]"
    >
      <Flex className="!gap-2">
        <ShieldAlertIcon />
        <Text>{(block.content as MarkupResponse).markupContent}</Text>
      </Flex>

      <Flex className="!flex-row !gap-2">
        <Button
          variant="soft"
          className="mt-2"
          onClick={() =>
            actionHandler?.({ action: "fix", scrollHandler: scrollHandler })
          }
        >
          Fix
        </Button>
        <Button
          variant="soft"
          className="mt-2"
          onClick={() => dispatch(clearMessages())}
        >
          New Chat
        </Button>
      </Flex>
    </Card>
  );
};

export default System;
