import { useEffect } from "react";
import { Block } from "../types";
import Message, { MessageAction } from "../Message";

const MessageBlock = ({
  block,
  onAnimated,
  handleActions,
}: {
  block: Block;
  onAnimated: () => void;
  handleActions: (action: MessageAction) => void;
}) => {
  useEffect(() => {
    onAnimated();
  }, [onAnimated]);
  return (
    <Message
      block={block}
      handleAction={
        block.role === "system"
          ? (action: MessageAction) => handleActions(action)
          : () => {}
      }
    />
  );
};

export default MessageBlock;
