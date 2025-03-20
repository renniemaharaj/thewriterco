import {
  Avatar,
  Blockquote,
  Button,
  Card,
  Flex,
  IconButton,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import React, { useCallback, useState } from "react";
import { Block, Code, MarkupResponse, Scripture } from "./types";
import { BookTextIcon, ShieldAlertIcon } from "lucide-react";
import fetchGitBlob, { kjvRepoUrl } from "../hooks/data/gitFetcher";
import { useDispatch } from "react-redux";
import {
  setEBook,
  setGlobalCurrentChapter,
  setGlobalCurrentVerse,
  setOpenState,
  setRenderStyle,
} from "../../app/ereader/ereaderSlice";
import { EBook } from "../../app/ereader/types";
import { clearMessages } from "../../app/chat/chatSlice";
import Collapsible from "../Collapsible";
import Editor from "./Editor";

export type MessageAction = "fix" | "new";

type MessageProps = {
  block: Block;
  handleAction?: (action: MessageAction) => void;
};

const Message: React.FC<MessageProps> = ({ block, handleAction }) => {
  const [collapseCode, setCollapseCode] = useState(true);
  const CodeBlock = useCallback(
    ({ block }: { block: Block }) => {
      return collapseCode ? <></> : <Editor block={block} />;
    },
    [collapseCode],
  );
  const dispatch = useDispatch();
  return (
    <Card
      variant="ghost"
      className="!flex !flex-col !w-full !mx-auto !justify-center"
    >
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
        {block.role === "model" && (
          <Avatar
            color="gold"
            size={"1"}
            className={`h-6 w-6 relative ml-2 !my-10`}
            fallback="M"
          >
            {"M"}
          </Avatar>
        )}

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
                className=" p-3 rounded-xl whitespace-pre-wrap"
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
                  <Tooltip content={verse.verseContent}>
                    <IconButton
                      variant="ghost"
                      size="1"
                      className="animate-pulse !font-bold "
                      onClick={() => {
                        fetchGitBlob(kjvRepoUrl, verse.book, "json").then(
                          (content) => {
                            dispatch(
                              setEBook({
                                title: verse.book,
                                content: JSON.parse(content),
                                date: new Date().toDateString(),
                              } as EBook),
                            );
                            dispatch(setRenderStyle("bible"));
                            dispatch(
                              setGlobalCurrentChapter(
                                verse.chapterNo.toString(),
                              ),
                            );
                            dispatch(
                              setGlobalCurrentVerse(verse.verseNo.toString()),
                            );
                            setTimeout(() => dispatch(setOpenState(true)), 100);
                          },
                        );
                      }}
                    >
                      <BookTextIcon /> {verse.book} {verse.chapterNo} {" : "}
                      {verse.verseNo}
                    </IconButton>
                  </Tooltip>
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
