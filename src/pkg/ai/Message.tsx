import { Avatar, Blockquote, Button, Card, Flex, Text } from "@radix-ui/themes";
import React, { useCallback, useState } from "react";
import { Block, Code, MarkupResponse, Scripture } from "./types";
import { ShieldAlertIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { clearMessages } from "../../app/chat/chatSlice";
import Collapsible from "../Collapsible";
import Editor from "./Editor";
import useUserLikelySignedIn from "../firebase/auth/hooks/useUserLikelySignedIn";
import VerseItem from "./blocks/VerseItem";

export type MessageAction = "fix" | "new";

type MessageProps = {
  block: Block;
  handleAction?: (action: MessageAction) => void;
};

const Message: React.FC<MessageProps> = ({ block, handleAction }) => {
  const [collapseCode, setCollapseCode] = useState(true);

  const { user } = useUserLikelySignedIn();
  const dispatch = useDispatch();

  const CodeBlock = useCallback(
    ({ block }: { block: Block }) => {
      return collapseCode ? <></> : <Editor block={block} />;
    },
    [collapseCode],
  );
  return (
    <Card variant="ghost" className="!flex !flex-col !w-full !justify-center">
      <Flex
        direction="column"
        justify={block.role === "user" ? "end" : "start"}
        className={`${
          block.role === "user"
            ? "text-right !self-end  rounded-2xl"
            : "text-left  rounded-xl"
        } !text-sm !max-h-fit !overflow-hidden !p-3`}
        style={{
          animationDuration: "0.5s",
          animationFillMode: "forwards",
        }}
      >
        {
          <Avatar
            size={"1"}
            className={`${block.role === "model" ? "ml-2 !my-10" : "!mr-2 !my-6 !self-end"} h-6 w-6 relative`}
            src={block.role === "model" ? "M" : (user?.photoURL ?? "U")}
            fallback={block.role === "model" ? "M" : "U"}
          />
        }

        {block.role === "user" && (
          <Card
            variant="ghost"
            className="!border-none !outline-none whitespace-pre-wrap !justify-end !flex"
          >
            <Text className="!mr-0">
              {(block.content as MarkupResponse).markupContent}
            </Text>
          </Card>
        )}

        {block.role === "system" && (
          <Card
            variant="ghost"
            className="text-red-500 !flex !flex-col !items-center !gap-2 max-w-[300px]"
          >
            <Flex className="!gap-2">
              <ShieldAlertIcon />
              <Text>{(block.content as MarkupResponse).markupContent}</Text>
            </Flex>

            <Flex className="!flex-row !gap-2">
              <Button
                variant="soft"
                className="mt-2"
                onClick={() => handleAction?.("fix")}
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
        )}

        {block.role === "model" && block.type === "markup" && (
          <Card
            variant="ghost"
            className="!border-none !outline-none !p-0 !gap-1"
          >
            <Blockquote>
              <div
                className="p-3 rounded-xl whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: (block.content as MarkupResponse).markupContent,
                }}
              />
            </Blockquote>
          </Card>
        )}

        {block.role === "model" && block.type === "code" && (
          <Collapsible
            title={(block.content as Code).filename}
            onOpen={() => setCollapseCode(false)}
            onClose={() => setCollapseCode(true)}
          >
            <CodeBlock block={block} />
          </Collapsible>
        )}

        {block.role === "model" && block.type === "scripture" && (
          <Card variant="ghost" size="1" className=" p-3 rounded-xl">
            <Flex className="!flex-row !gap-3 !justify-center !items-center !flex-wrap">
              {(block.content as Scripture).verses.map((verse, idx) => (
                <React.Fragment key={`verse-${idx}`}>
                  <VerseItem verse={verse} />
                </React.Fragment>
              ))}
            </Flex>
          </Card>
        )}
      </Flex>
    </Card>
  );
};

export default Message;
