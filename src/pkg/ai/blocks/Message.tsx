import { Flex } from "@radix-ui/themes";
import type React from "react";
import { useEffect } from "react";
import Avatar from "./Avatar";
import Code from "./Code";
import Model from "./Model";
import Scripture from "./Scripture";
import System from "./System";
import User from "./User";
import type { MessageProps } from "./types";

const Message: React.FC<MessageProps> = ({ block, scrollHandler, onMount }) => {
  useEffect(() => onMount?.(), [onMount]);
  return (
    <Flex
      className={`${block.role === "user" && "!flex-row-reverse"} 
         !w-full text-left text-sm max-h-fit overflow-hidden`}
    >
      <Flex className={`${block.role === "user" && "!flex-row-reverse"} w-full gap-2 !p-3`}>
        <Avatar role={block.role} />

        {block.role === "user" && <User block={block} />}

        {block.role === "model" && block.type === "markup" && <Model block={block} />}

        {block.role === "model" && block.type === "code" && <Code block={block} />}

        {block.role === "model" && block.type === "scripture" && <Scripture block={block} />}

        {block.role === "system" && <System block={block} scrollHandler={scrollHandler} />}
      </Flex>
    </Flex>
  );
};

export default Message;
