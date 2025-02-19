import {
  Flex,
  Button,
  ScrollArea,
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
import { useCallback, useEffect, useRef, useState } from "react";
import { useSendAskReqMutation } from "../../../app/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import Chatbox from "../Chatbox";
import { useThemeContext } from "../../context/useThemeContext";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisVerticalIcon,
  PlayCircleIcon,
  ShieldAlertIcon,
} from "lucide-react";
import {
  Block,
  Code,
  Exchange,
  MarkupResponse,
  ResponseBlock,
  Scripture,
} from "./types";
import Flow from "../../flow/Flow.tsx";
import { Node } from "@xyflow/react";
import { Carousel } from "../Carousel.tsx";
import React from "react";
import fetchGitBlob from "../articles/utils/bible/gitgetter.ts";
import {
  setEBook,
  setGlobalCurrentChapter,
  setGlobalCurrentVerse,
  setOpenState,
  setRenderStyle,
} from "../../../app/ereader/ereaderSlice.ts";
import { EBook } from "../../../app/ereader/types.ts";

import * as msgpack from "@msgpack/msgpack";
import { fromByteArray } from "base64-js";
// import { Scripture } from "../NavBar.tsx";
import MonacoEditor from "../../MonacoEditor.tsx";

const ChristianAIChatbox = ({
  className,
  highlightAxioms,
  // suspendsAxioms,
}: {
  className?: string;
  highlightAxioms: () => void;
  // suspendsAxioms: () => void;
}) => {
  const { theme } = useThemeContext();

  const dispatch = useDispatch();
  const [sendAskReq] = useSendAskReqMutation();

  const [messageBlocks, setMessageBlocks] = useState<Block[]>([
    {
      sender: "AI",
      type: "markup",
      content: {
        type: "markup",
        markupContent: "Hi! 🙏 How may I be of service to you?",
      },
    },
  ]);
  // const [executables, setExecutables] = useState<Executable[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [canvasView, setCanvasView] = useState(false);
  const [Conversational, setConversational] = useState(true);
  const [conversationTokens, setConversationTokens] = useState<number>(0);
  const [responseConstraint, setResponseConstraint] = useState<
    "short" | "shorter" | "detailed"
  >("shorter");

  const [suggestions, setSuggestions] = useState<string[]>([
    "Why Christianity?",
    "How can I be saved?",
    "What is the Gospel?",
    "Let's study patience",
    "Let's study love",
    "Infallible responses?",
    "Substitute for fellowship?",
  ]);

  const messageBoxRef = useRef<HTMLDivElement>(null);

  const eReaderState = useSelector((state: RootState) => state.ereader);

  const scrollMessageBoxToBottom = () => {
    messageBoxRef.current?.scrollTo({
      top: messageBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  function setSystemMessage(content: string) {
    setMessageBlocks((prev) => [
      ...prev,
      {
        sender: "System" as const,
        type: "markup",
        content: {
          type: "markup",
          markupContent: content,
        },
      },
    ]);
  }

  // Build conversation for AI
  async function buildConversation(
    primaryBlocks: Block[],
    additionalExchange?: Exchange,
  ): Promise<Exchange[]> {
    const conversation = primaryBlocks.map((block) => {
      if (block.type === "markup") {
        return {
          sender: block.sender,
          content: (block.content as MarkupResponse).markupContent,
        };
      } else if (block.type === "code") {
        return {
          sender: block.sender,
          content: (block.content as Code).codeContent,
        };
      } else {
        return {
          sender: block.sender,
          content: (block.content as Scripture).verses.toString(),
        };
      }
    });

    if (additionalExchange) {
      conversation.push(additionalExchange);
    }

    return conversation;
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
            // Append AI markup response
            setMessageBlocks((prev) => [
              ...prev,
              {
                sender: "AI" as const,
                type: "markup",
                content: block.content as MarkupResponse,
              },
            ]);

            // Detect mention of axioms
            if ((block.content as MarkupResponse).markupContent.match(regex)) {
              highlightAxioms();
            }
            break;

          case "scripture":
            // Process scripture content
            setMessageBlocks((prev) => [
              ...prev,
              {
                sender: "AI" as const,
                type: "scripture",
                content: block.content as Scripture,
              },
            ]);
            break;

          case "code":
            // Process code content
            setMessageBlocks((prev) => [
              ...prev,
              {
                sender: "AI" as const,
                type: "code",
                content: block.content as Code,
              },
            ]);
            break;

          default:
            console.warn(`Unknown response block type: ${block.type}`);
        }
      });

      return true;
    } catch (error) {
      if (data.response) {
        setSystemMessage(data.response);
      }
      console.error("Error parsing AI response:", error);
    }
  }

  async function handleMessageSend(msg: string) {
    if (!msg.trim()) return;

    setMessageBlocks((prev) => [
      ...prev,
      {
        sender: "User",
        type: "markup",
        content: {
          type: "markup",
          markupContent: msg,
        },
      },
    ]);

    if (Conversational && conversationTokens > 10000) {
      setSystemMessage("Conversation limit reached, please start a new chat.");
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
    const attachedResponseConstraint = `-@here Note user's chosen response-constraint for appropriate response length: ${responseConstraint}`;
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

    if (Conversational) {
      conversation = await buildConversation(messageBlocks, {
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

      setSystemMessage(
        "A connection error occurred or you are required to wait 15 seconds.",
      );
      setIsTyping(false);
      return; // Exit early to prevent further execution
    }

    try {
      await parseAIResponse(data);
    } catch (error) {
      console.error(error);
      setSystemMessage(
        data.response || "An error occurred while processing the response.",
      );
    } finally {
      setIsTyping(false);
    }
  }

  function handleSuggestionClick(msg: string) {
    setSuggestions((prev) => prev.filter((suggestion) => suggestion !== msg));
    handleMessageSend(msg);
  }

  const computeTokens = useCallback(async () => {
    const conversation = await buildConversation(messageBlocks);
    const msgPackData = msgpack.encode(conversation);
    return msgPackData.length;
  }, [messageBlocks]);

  useEffect(() => {
    if (messageBlocks.length) {
      const lastMessage = messageBlocks[messageBlocks.length - 1];
      if (lastMessage.sender === "AI") {
        scrollMessageBoxToBottom();
      }
    }

    computeTokens().then((tokens) => {
      setConversationTokens(tokens);
    });
  }, [messageBlocks]);

  // const [frameSetup] = useState(frameSetups.Top);

  const MessageBlock = ({
    block,
  }: {
    block: Block;
    animate: boolean;
    onAnimated: () => void;
  }) => {
    return (
      <Flex
        direction="column"
        justify={block.sender === "User" ? "end" : "start"}
        className={`${
          block.sender === "User" ? "text-right !self-end" : "text-left"
        } min-h-10 max-w-[90%] !text-sm !max-h-fit !overflow-hidden !p-2 opacity-0 animate-fade-in`}
        style={{
          animationDuration: "0.5s",
          animationFillMode: "forwards",
        }}
      >
        {block.sender === "User" && (
          <div
            dangerouslySetInnerHTML={{
              __html: (block.content as MarkupResponse).markupContent,
            }}
          />
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
                  handleMessageSend(
                    (
                      messageBlocks[messageBlocks.length - 1]
                        .content as MarkupResponse
                    ).markupContent,
                  );
                  setMessageBlocks((prev) => prev.slice(0, -2));
                }}
                className="mt-2"
              >
                Retry
              </Button>
              <Button
                variant="soft"
                onClick={() => {
                  setMessageBlocks([]);
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
            <Flex className="!flex-row !gap-1 !mb-2">
              <Badge variant="soft" className="!mr-2">
                {(block.content as Code).filename}
              </Badge>
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
          <Carousel
            variant="no-scrollbar"
            className="max-w-[300px]"
            items={(block.content as Scripture).verses.map((verse, idx) => (
              <React.Fragment key={`verse-${idx}`}>
                <Tooltip content={verse.verseContent}>
                  <Button
                    variant="ghost"
                    size="1"
                    className="animate-pulse !font-bold"
                    onClick={() => {
                      fetchGitBlob(verse.book).then((content) => {
                        dispatch(
                          setEBook({
                            title: verse.book,
                            content: JSON.parse(content),
                            date: new Date().toDateString(),
                          } as EBook),
                        );
                        dispatch(setRenderStyle("bible"));
                        dispatch(
                          setGlobalCurrentChapter(verse.chapterNo.toString()),
                        );
                        dispatch(
                          setGlobalCurrentVerse(verse.verseNo.toString()),
                        );
                        setTimeout(() => dispatch(setOpenState(true)), 100);
                      });
                    }}
                  >
                    <PlayCircleIcon /> {verse.book} {verse.chapterNo}:
                    {verse.verseNo}
                  </Button>
                </Tooltip>
              </React.Fragment>
            ))}
          />
        )}
      </Flex>
    );
  };
  const SkeletonTextBlock = () => {
    const [blockMounted, setBlockMounted] = useState(false);

    useEffect(() => {
      setTimeout(() => setBlockMounted(true), 100);
    }, []);

    const baseClassName = "w-0 h-4 rounded mb-2 !transition-all !duration-900";
    return (
      <>
        <Skeleton className={`${blockMounted && "!w-3/4"} ${baseClassName}`} />
        <Skeleton className={`${blockMounted && "!w-2/4"} ${baseClassName}`} />
        <Skeleton className={`${blockMounted && "!w-1/4"} ${baseClassName}`} />
      </>
    );
  };

  const scrollScrollArea = (direction: "up" | "down") => {
    if (messageBoxRef.current) {
      const scrollY = messageBoxRef.current.scrollTop;
      const scrollAmount = 300;

      if (direction === "up") {
        messageBoxRef.current.scrollTo({
          top: scrollY - scrollAmount,
          behavior: "smooth",
        });
      } else {
        messageBoxRef.current.scrollTo({
          top: scrollY + scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };
  const arrowButtonClassnames =
    "absolute right-3 !scale-75 transform -translate-y-1/2 z-10 p-1 bg-[#6a6052] rounded-full shadow-md opacity-80 text-white";

  const BtnScrollUp = () => (
    <button
      className={arrowButtonClassnames + " !bottom-2/4"}
      onClick={() => scrollScrollArea("up")}
    >
      <ChevronUpIcon />
    </button>
  );

  const BtnScrollDown = () => (
    <button
      className={arrowButtonClassnames + " !top-2/4"}
      onClick={() => scrollScrollArea("down")}
    >
      <ChevronDownIcon />
    </button>
  );

  const ScrollAreaComponent = useCallback(() => {
    return (
      <ScrollArea
        ref={messageBoxRef}
        className={`${className} !top-0 !h-[70vh] ${isTyping && "animate-pulse"}`}
      >
        {canvasView && (
          <>
            <BtnScrollUp />
            <BtnScrollDown />
          </>
        )}

        <Flex className="gap-1 mb-4 !flex-wrap">
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
        <Flex
          direction="column"
          className={`m-[1rem] box-content !scroll-smooth gap-6`}
        >
          {messageBlocks.map((block, index) => (
            <Flex
              key={index}
              justify="center"
              className={`!flex-col max-w-[90%] !gap-1`}
            >
              <MessageBlock
                block={block}
                animate={index === messageBlocks.length - 1}
                onAnimated={scrollMessageBoxToBottom}
              />
            </Flex>
          ))}

          {isTyping && (
            <Flex justify="center" className="text-gray-500 italic !flex-col">
              <SkeletonTextBlock />
            </Flex>
          )}
        </Flex>

        {/* </Flex> */}
      </ScrollArea>
    );
  }, [messageBlocks, canvasView]);

  //Build node from scroll area
  const scrollAreaToNode = useCallback(
    () =>
      ({
        id: "scroll-area",
        type: "scrollArea",
        data: {
          label: "Scroll Area",
          children: <ScrollAreaComponent />,
        },
        position: { x: 0, y: 0 },
      }) as Node,
    [messageBlocks, canvasView],
  );

  const countMessageBlocks = useCallback(() => {
    return messageBlocks.length;
  }, [messageBlocks]);

  return (
    <Flex className={`relative ${className} !flex-col !h-[100vh] `}>
      {/* <Card className="bg-red-400 !top-0" variant="ghost"> */}
      {canvasView ? (
        <Flow
          nodes={[scrollAreaToNode()]}
          messageBlocksCount={countMessageBlocks()}
        />
      ) : (
        <ScrollAreaComponent />
      )}
      {/* <Frame {...frameSetup} /> */}
      <Chatbox
        disabled={isTyping}
        handleRecieve={(text: string) => handleMessageSend(text)}
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
                      defaultValue={responseConstraint}
                    >
                      <SegmentedControl.Item
                        value="shorter"
                        onClick={() => setResponseConstraint("shorter")}
                      >
                        <Tooltip content="Shorter responses, best for quick replies">
                          <Text>1</Text>
                        </Tooltip>
                      </SegmentedControl.Item>

                      <SegmentedControl.Item
                        value="short"
                        onClick={() => setResponseConstraint("short")}
                      >
                        <Tooltip content="Short responses, great for quick replies">
                          <Text>2</Text>
                        </Tooltip>
                      </SegmentedControl.Item>

                      <SegmentedControl.Item
                        value="detailed"
                        onClick={() => setResponseConstraint("detailed")}
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
                variant={canvasView ? "soft" : "outline"}
                onClick={() => setCanvasView(!canvasView)}
                className="!hidden md:!block"
              >
                Canvas
              </Button>
              <Button
                variant={Conversational ? "soft" : "outline"}
                onClick={() => setConversational(!Conversational)}
              >
                {Conversational
                  ? "Conversation (" + conversationTokens + " / 10k)"
                  : "Conversation"}
              </Button>
            </Flex>
          </Flex>
        }
      />
    </Flex>
  );
};

export default ChristianAIChatbox;
