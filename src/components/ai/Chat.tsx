import {
  Flex,
  Button,
  Card,
  Skeleton,
  Text,
  Tooltip,
  SegmentedControl,
  IconButton,
  Popover,
  Separator,
  Badge,
} from "@radix-ui/themes";
import {
  useCallback,
  useImperativeHandle,
  useEffect,
  useRef,
  forwardRef,
  useState,
} from "react";
import { useSendAskReqMutation } from "../../app/api/apiSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store.ts";
import { useThemeContext } from "../context/theme/useThemeContext.tsx";

import {
  BookTextIcon,
  CopyIcon,
  DownloadIcon,
  EllipsisVerticalIcon,
  ShieldAlertIcon,
} from "lucide-react";
import {
  Block,
  Code,
  MarkupResponse,
  ResponseBlock,
  Scripture,
} from "./types.ts";
import Flow from "../flow/Flow.tsx";
import { Node } from "@xyflow/react";
import React from "react";
import fetchGitBlob, { kjvRepoUrl } from "../hooks/data/gitFetcher.ts";
import {
  setEBook,
  setGlobalCurrentChapter,
  setGlobalCurrentVerse,
  setOpenState,
  setRenderStyle,
} from "../../app/ereader/ereaderSlice.ts";
import { EBook } from "../../app/ereader/types.ts";

import * as msgpack from "@msgpack/msgpack";
import { fromByteArray } from "base64-js";
// import { Scripture } from "../NavBar.tsx";
import MonacoEditor from "../MonacoEditor.tsx";
import Input from "./Input.tsx";
import {
  addMessage,
  clearMessages,
  setConversationMode,
  setConversationTokens,
  setResponseConstraint,
  setViewMode,
  spliceMessage,
} from "../../app/chat/chatSlice.ts";
import { buildConversation } from "./utils.ts";
import { initialSuggestions } from "./configuration.ts";
import useLocalStorage from "../hooks/useLocalStorage.ts";

const Chat = forwardRef(
  (
    {
      className,
      highlightAxioms,
      scrollMessageBoxToBottom,
    }: {
      className?: string;
      highlightAxioms: () => void;
      scrollMessageBoxToBottom: () => void;
    },
    ref,
  ) => {
    const { theme } = useThemeContext();

    const dispatch = useDispatch();
    const [sendAskReq] = useSendAskReqMutation();

    const [isTyping, setIsTyping] = useState(false);

    const [suggestions, setSuggestions] =
      useState<string[]>(initialSuggestions);

    const eReaderState = useSelector((state: RootState) => state.ereader);

    const chatState = useSelector((state: RootState) => state.chat);

    // const [chatState, setChatState] = useState(getInitialChatState());
    const [, setValue] = useLocalStorage("chatData", chatState);

    // Update local storage when chat state changes
    useEffect(() => {
      setValue(chatState);
    }, [chatState]);

    function dispatchAddMessage(content: Block) {
      dispatch(addMessage(content));
    }

    // Parse AI response
    async function parseAIResponse(data: { response: string }) {
      try {
        const genaiResponse = JSON.parse(data.response);

        // Ensure responseBlocks exist
        if (!genaiResponse.responseBlocks) {
          throw new Error("Invalid AI response format: Missing responseBlocks");
        }

        // Iterate through responseBlocks and handle different content types
        genaiResponse.responseBlocks.forEach((block: ResponseBlock) => {
          const regex = /axioms?/gi;
          switch (block.type) {
            case "markup":
              dispatchAddMessage({
                sender: "AI",
                type: "markup",
                content: block.content as MarkupResponse,
              });

              // Detect mention of axioms
              if (
                (block.content as MarkupResponse).markupContent.match(regex)
              ) {
                highlightAxioms();
              }
              break;

            case "scripture":
              // Process scripture content
              dispatchAddMessage({
                sender: "AI",
                type: "scripture",
                content: block.content as Scripture,
              });

              break;

            case "code":
              // Process code content
              dispatchAddMessage({
                sender: "AI",
                type: "code",
                content: block.content as Code,
              });
              break;

            default:
              console.warn(`Unknown response block type: ${block.type}`);
          }
        });

        return true;
      } catch (error) {
        if (data.response) {
          dispatchAddMessage({
            sender: "System",
            type: "markup",
            content: {
              type: "markup",
              markupContent: data.response,
            },
          });
        }
        console.error("Error parsing AI response:", error);
      }
    }

    async function handleMessageSend(msg: string, dispatchMessage = true) {
      if (!msg.trim()) return;

      if (dispatchMessage) {
        dispatchAddMessage({
          sender: "User",
          type: "markup",
          content: {
            type: "markup",
            markupContent: msg,
          },
        });
      }

      if (chatState.conversationTokens > 10000) {
        dispatchAddMessage({
          sender: "System",
          type: "markup",
          content: {
            type: "markup",
            markupContent:
              "Conversation limit reached, please start a new chat.",
          },
        });
        return;
      }

      scrollMessageBoxToBottom();
      setIsTyping(true);

      // Attach additional context to the message
      const attachedTheme = `-@here Note user's theme for appropriate styling: ${theme} mode`;
      const attachedBookState = `-@here Note user's current book state for your knowledge: ${eReaderState.eContent.title} ${eReaderState.currentChapter}:${eReaderState.currentVerse}`;

      // Attach date & time
      const attachedLocalTime = `-@here Note user's local time for context: ${new Date().toLocaleString()}`;
      const attachedCurrentDate = `-@here Note user's current date for context: ${new Date().toDateString()}`;
      const attachedResponseConstraint = `-@here Note user's chosen response-constraint for appropriate response length: ${chatState.responseConstraint || "Short"}`;
      const additionalContext = [
        attachedTheme,
        attachedBookState,
        attachedLocalTime,
        attachedCurrentDate,
        attachedResponseConstraint,
      ];

      // Build ask schema
      const askSchema = {
        conversation: "",
        additionalContext,
      };

      let conversation;

      if (chatState.conversationMode === "exchange") {
        conversation = await buildConversation(chatState.messages, {
          sender: "User",
          content: msg,
        });
      } else {
        conversation = await buildConversation([], {
          sender: "User",
          content: msg,
        });
      }

      console.log("conversation", conversation);
      // return;

      const msgPackData = msgpack.encode(conversation);
      const base64String = fromByteArray(new Uint8Array(msgPackData));

      askSchema.conversation = base64String;

      let data = { response: "" };

      try {
        data = await sendAskReq({
          message: JSON.stringify(askSchema),
        }).unwrap();
      } catch (error) {
        console.error(error);
        dispatchAddMessage({
          sender: "System",
          type: "markup",
          content: {
            type: "markup",
            markupContent:
              "A connection error occurred or you are required to wait 15 seconds.",
          },
        });
        setIsTyping(false);
        return; // Exit early to prevent further execution
      }

      try {
        await parseAIResponse(data);
      } catch (error) {
        console.error(error);
        dispatchAddMessage({
          sender: "System",
          type: "markup",
          content: {
            type: "markup",
            markupContent:
              "An error occurred while processing the response. Please try again.",
          },
        });
      } finally {
        setIsTyping(false);
      }
    }

    // Expose methods to parent via ref
    useImperativeHandle(ref, () => ({
      handleMessageSend,
    }));

    function handleSuggestionClick(msg: string) {
      setSuggestions((prev) => prev.filter((suggestion) => suggestion !== msg));
      handleMessageSend(msg);
    }

    const computeTokens = useCallback(async () => {
      const conversation = await buildConversation(chatState.messages);
      const msgPackData = msgpack.encode(conversation);
      return msgPackData.length;
    }, [chatState.messages]);

    useEffect(() => {
      if (chatState.messages.length > 0) {
        scrollMessageBoxToBottom();
      }

      computeTokens().then((tokens) => {
        dispatch(setConversationTokens(tokens));
      });
    }, [chatState.messages]);

    const MessageBlock = ({
      block,
      onAnimated,
    }: {
      block: Block;
      onAnimated: () => void;
    }) => {
      useEffect(() => {
        onAnimated();
      }, []);
      return (
        <Flex justify="center" className={`!flex-col max-w-[90%] !gap-1`}>
          <Flex
            direction="column"
            justify={block.sender === "User" ? "end" : "start"}
            className={`${
              block.sender === "User" ? "text-right !self-end" : "text-left"
            } max-w-[90%] !text-sm !max-h-fit !overflow-hidden !p-2 opacity-0 animate-fade-in`}
            style={{
              animationDuration: "0.5s",
              animationFillMode: "forwards",
            }}
          >
            {block.sender === "User" && (
              <Card className="!border-none !outline-none whitespace-pre-wrap">
                {/* <pre className="whitespace-pre-wrap !text-left"> */}
                {(block.content as MarkupResponse).markupContent}
                {/* </pre> */}
              </Card>
            )}
            {block.sender === "System" && (
              <Card className="text-red-500 !flex !flex-col !items-center !gap-2 max-w-[300px]">
                <Flex className="!gap-2">
                  <Flex>
                    <ShieldAlertIcon />
                  </Flex>
                  <Text>{(block.content as MarkupResponse).markupContent}</Text>
                </Flex>

                <Flex className="!flex-row !gap-2">
                  <Button
                    variant="soft"
                    onClick={() => {
                      const lastmessageContent = chatState.messages[
                        chatState.messages.length - 2
                      ].content as MarkupResponse;
                      handleMessageSend(lastmessageContent.markupContent);
                      dispatch(spliceMessage(chatState.messages.length - 2));
                    }}
                    className="mt-2"
                  >
                    Resend
                  </Button>
                  <Button
                    variant="soft"
                    onClick={() => {
                      dispatch(clearMessages());
                    }}
                    className="mt-2"
                  >
                    New Chat
                  </Button>
                </Flex>
              </Card>
            )}
            {block.sender === "AI" && block.type === "markup" && (
              <div
                dangerouslySetInnerHTML={{
                  __html: (block.content as MarkupResponse).markupContent,
                }}
              />
            )}
            {block.sender === "AI" && block.type === "code" && (
              <Card className="!p-1">
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
                            type:
                              (block.content as Code).mimeType || "text/plain",
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

                  {/* <Badge variant="soft">{(block.content as Code).language}</Badge> */}
                </Flex>
                <MonacoEditor
                  language={(block.content as Code).language || "plaintext"}
                  code={(block.content as Code).codeContent}
                  height={(block.content as Code).editorHeight || 400}
                />
              </Card>
            )}

            {block.sender === "AI" && block.type === "scripture" && (
              <Card size="1">
                <Flex className="!flex-row !gap-2 flex-wrap">
                  {(block.content as Scripture).verses.map((verse, idx) => (
                    <React.Fragment key={`verse-${idx}`}>
                      <Tooltip content={verse.verseContent}>
                        <IconButton
                          variant="ghost"
                          size="1"
                          className="animate-pulse !font-bold"
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
                                  setGlobalCurrentVerse(
                                    verse.verseNo.toString(),
                                  ),
                                );
                                setTimeout(
                                  () => dispatch(setOpenState(true)),
                                  100,
                                );
                              },
                            );
                          }}
                        >
                          <BookTextIcon /> {verse.book} {verse.chapterNo} :
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

    const SkeletonTextBlock = () => {
      const [blockMounted, setBlockMounted] = useState(false);

      useEffect(() => {
        setTimeout(() => setBlockMounted(true), 100);
      }, []);

      const baseClassName =
        "w-3/4 h-4 rounded mb-2 opacity-0 transition-opacity duration-700";

      return (
        <>
          <Skeleton
            className={`${blockMounted && "animate-fade-in opacity-100"} ${baseClassName} !w-[70%] mt-5 delay-100`}
          />
          <Skeleton
            className={`${blockMounted && "animate-fade-in opacity-100"} ${baseClassName} !w-2/4 delay-200`}
          />
          <Skeleton
            className={`${blockMounted && "animate-fade-in opacity-100"} ${baseClassName} !w-1/4 delay-300`}
          />
        </>
      );
    };

    const countMessageBlocks = useCallback(() => {
      return chatState.messages.length;
    }, [chatState.messages]);

    const chatRef = useRef<HTMLDivElement>(null);
    const [chatBoxRespectiveWidth, setChatBoxRespectiveWidth] = useState(0);

    useEffect(() => {
      const updateWidth = () => {
        if (chatRef.current) {
          setChatBoxRespectiveWidth(chatRef.current.offsetWidth);
        }
      };

      updateWidth(); // Initial width calculation

      const resizeObserver = new ResizeObserver(updateWidth);

      if (chatRef.current) {
        resizeObserver.observe(chatRef.current);
      }

      return () => resizeObserver.disconnect();
    }, []);

    const ViewContainer = useCallback(() => {
      return (
        <Flex
          className={`${isTyping && "animate-pulse"} flex-col !w-full !h-fit pb-[150px]`}
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
              <MessageBlock
                block={block}
                onAnimated={scrollMessageBoxToBottom}
              />
            </React.Fragment>
          ))}

          {isTyping && (
            <Flex justify="center" className="text-gray-500 italic !flex-col">
              <SkeletonTextBlock />
            </Flex>
          )}
        </Flex>
      );
    }, [chatState, chatState.messages, chatState.viewMode, isTyping]);

    //Build node from scroll area
    const MessageContainerNode = useCallback(
      () =>
        ({
          id: "scroll-area",
          type: "scrollArea",
          data: {
            label: "Scroll Area",
            children: <ViewContainer />,
          },
          position: { x: 0, y: 0 },
        }) as Node,
      [chatState.messages, chatState.viewMode],
    );

    return (
      <Flex ref={chatRef} className={`${className}`}>
        {/* <Card className="bg-red-400 !top-0" variant="ghost"> */}
        {/* {canvasView ? ( */}
        {chatState.viewMode === "canvas" ? (
          <div className="!w-full !h-[75vh]">
            <Flow
              nodes={[MessageContainerNode()]}
              messageBlocksCount={countMessageBlocks()}
            />
          </div>
        ) : (
          <ViewContainer />
        )}

        <Input
          disabled={isTyping}
          handleRecieve={(text: string) => handleMessageSend(text)}
          className={`!absolute ${chatState.messageBoxMode === "hidden" && "!hidden"} bottom-[2px] md:!bottom-[10px] blurred-div animate-fade-in`}
          style={{ width: chatBoxRespectiveWidth }}
          children={
            <Flex gap="2" className="!flex-row">
              <Flex align={"center"} className="!p-1 gap-2 !flex-wrap">
                <Popover.Root>
                  <Popover.Trigger>
                    <IconButton variant="soft">
                      <EllipsisVerticalIcon className="scale-75" />
                    </IconButton>
                  </Popover.Trigger>
                  <Popover.Content>
                    <Text className="!w-full !text-center text-sm">
                      Response Length
                    </Text>
                    <Separator size="4" className="!my-2" />
                    <Flex gap="3">
                      <SegmentedControl.Root
                        variant="classic"
                        size={"2"}
                        defaultValue={chatState.responseConstraint}
                        // defaultValue={responseConstraint}
                      >
                        <SegmentedControl.Item
                          value="shorter"
                          // onClick={() => setResponseConstraint("shorter")}
                          onClick={() =>
                            dispatch(setResponseConstraint("shorter"))
                          }
                        >
                          <Tooltip content="Shorter responses, best for quick replies">
                            <Text>1</Text>
                          </Tooltip>
                        </SegmentedControl.Item>

                        <SegmentedControl.Item
                          value="short"
                          // onClick={() => setResponseConstraint("short")}
                          onClick={() =>
                            dispatch(setResponseConstraint("short"))
                          }
                        >
                          <Tooltip content="Short responses, great for quick replies">
                            <Text>2</Text>
                          </Tooltip>
                        </SegmentedControl.Item>

                        <SegmentedControl.Item
                          value="detailed"
                          // onClick={() => setResponseConstraint("detailed")}
                          onClick={() =>
                            dispatch(setResponseConstraint("detailed"))
                          }
                        >
                          <Tooltip content="Regular responses, best for detailed replies">
                            <Text>3</Text>
                          </Tooltip>
                        </SegmentedControl.Item>
                      </SegmentedControl.Root>
                    </Flex>
                  </Popover.Content>
                </Popover.Root>
                <Button
                  variant={"outline"}
                  onClick={() => dispatch(setOpenState(true))}
                >
                  Bible
                </Button>
                <Button
                  variant={chatState.viewMode === "canvas" ? "soft" : "outline"}
                  onClick={() =>
                    dispatch(
                      setViewMode(
                        chatState.viewMode === "canvas" ? "standard" : "canvas",
                      ),
                    )
                  }
                >
                  Canvas
                </Button>
                <Button
                  variant={
                    chatState.conversationMode === "exchange"
                      ? "soft"
                      : "outline"
                  }
                  onClick={() =>
                    dispatch(
                      setConversationMode(
                        chatState.conversationMode === "exchange"
                          ? "none"
                          : "exchange",
                      ),
                    )
                  }
                >
                  {chatState.conversationMode === "exchange"
                    ? "Conversation (" +
                      chatState.conversationTokens +
                      " / 10k)"
                    : "Conversation"}
                </Button>
              </Flex>
            </Flex>
          }
        />
      </Flex>
    );
  },
);

export default Chat;
