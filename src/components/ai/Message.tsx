import {
  Badge,
  Blockquote,
  Button,
  Card,
  Flex,
  IconButton,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import React from "react";
import { Block, Code, MarkupResponse, Scripture } from "./types";
import {
  BookTextIcon,
  CopyIcon,
  DownloadIcon,
  ShieldAlertIcon,
} from "lucide-react";
import MonacoEditor from "../MonacoEditor";
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

type MessageProps = {
  block: Block;
};
const Message: React.FC<MessageProps> = ({ block }) => {
  const dispatch = useDispatch();
  return (
    <Flex justify="center" className="!flex-col !max-w-full">
      <Flex
        direction="column"
        justify={block.sender === "User" ? "end" : "start"}
        className={`${
          block.sender === "User"
            ? "text-right !self-end  rounded-2xl"
            : "text-left  rounded-xl"
        } !text-sm !max-h-fit !overflow-hidden !p-3 opacity-0 animate-fade-in`}
        style={{
          animationDuration: "0.5s",
          animationFillMode: "forwards",
        }}
      >
        {block.sender === "User" && (
          <Card className="!border-none !outline-none whitespace-pre-wrap">
            <Flex className="items-center !justify-end gap-2">
              <Text className="text-xs font-bold se">User</Text>
              {/* <Avatar className="h-6 w-6 bg-blue-500 text-white">U</Avatar> */}
            </Flex>
            <Text>{(block.content as MarkupResponse).markupContent}</Text>
          </Card>
        )}

        {block.sender === "System" && (
          <Card
            variant="ghost"
            className="text-red-500 !flex !flex-col !items-center !gap-2 max-w-[300px]"
          >
            <Flex className="!gap-2">
              <ShieldAlertIcon />
              <Text>{(block.content as MarkupResponse).markupContent}</Text>
            </Flex>

            <Flex className="!flex-row !gap-2">
              <Button variant="soft" disabled className="mt-2">
                Resend
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

        {block.sender === "AI" && block.type === "markup" && (
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

        {block.sender === "AI" && block.type === "code" && (
          <Card className="!p-3">
            <Flex className="!flex-row !gap-2 !mb-2 !justify-between">
              <Badge variant="soft" className="!mr-2">
                {(block.content as Code).filename}
              </Badge>
              <Flex className="!flex-row !gap-2 !mb-2">
                <IconButton
                  variant="soft"
                  size="1"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      (block.content as Code).codeContent,
                    );
                  }}
                >
                  <CopyIcon className="scale-50" />
                </IconButton>
                <IconButton
                  variant="soft"
                  size="1"
                  onClick={() => {
                    const blob = new Blob(
                      [(block.content as Code).codeContent],
                      {
                        type: (block.content as Code).mimeType || "text/plain",
                      },
                    );
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = (block.content as Code).filename;
                    a.click();
                  }}
                >
                  <DownloadIcon className="scale-50" />
                </IconButton>
              </Flex>
            </Flex>
            <MonacoEditor
              language={(block.content as Code).language || "plaintext"}
              code={(block.content as Code).codeContent}
              height={(block.content as Code).editorHeight || 400}
            />
          </Card>
        )}

        {block.sender === "AI" && block.type === "scripture" && (
          <Card variant="ghost" size="1" className=" p-3 rounded-xl">
            <Flex className="!flex-row !gap-2 flex-wrap">
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
    </Flex>
  );
};

export default Message;
