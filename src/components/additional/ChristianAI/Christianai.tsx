import {
  Flex,
  Button,
  ScrollArea,
  Card,
  Skeleton,
  Switch,
  Text,
  Badge,
} from "@radix-ui/themes";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSendAskReqMutation } from "../../../app/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import Chatbox from "../Chatbox";
import { useThemeContext } from "../../context/useThemeContext";

import {
  AlertCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlayCircleIcon,
} from "lucide-react";
import { Block, Executable } from "./types";
import Frame from "../../frames/Frame.tsx";
import { frameSetups } from "../../frames/frameVarients.ts";
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
import { Scripture } from "../NavBar.tsx";

type Exchange = {
  sender: "User" | "AI" | "System";
  content: string;
};

const ChristianAIChatbox = ({ className }: { className?: string }) => {
  const { theme } = useThemeContext();

  const dispatch = useDispatch();
  const [sendAskReq] = useSendAskReqMutation();

  const [input] = useState("");
  const [messageBlocks, setMessageBlocks] = useState<Block[]>([]);
  const [executables, setExecutables] = useState<Executable[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [canvasView, setCanvasView] = useState(false);
  const [Conversational, setConversational] = useState(true);

  const [suggestions, setSuggestions] = useState<string[]>([
    "Who is God?",
    "Why Christianity?",
    "How can I be saved?",
    "White Jesus?",
    "What is the Gospel?",
    "Which denomination is right?",
    "Let's study patience",
    "Let's study love",
  ]);

  const messageBoxRef = useRef<HTMLDivElement>(null);

  const eReaderState = useSelector((state: RootState) => state.ereader);

  const scrollMessageBoxToBottom = () => {
    messageBoxRef.current?.scrollTo({
      top: messageBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  // Build conversation for AI
  async function buildConversation(
    primaryBlocks: Block[],
    additionalExchange?: Exchange,
  ): Promise<Exchange[]> {
    const conversation = primaryBlocks.map((block) => {
      return {
        sender: block.sender,
        content: block.content,
      };
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
      setMessageBlocks((prev) => [
        ...prev,
        {
          sender: "AI" as const,
          type: "text",
          content: genaiResponse.markupResponse,
        },
      ]);

      genaiResponse.dataObjects.forEach((scripture: Scripture) => {
        setExecutables((prev) => [
          ...prev,
          {
            jsxTrigger: (
              <Button
                variant="ghost"
                size="1"
                className="animate-pulse !font-bold"
                onClick={() => {
                  fetchGitBlob(scripture.book).then((content) => {
                    dispatch(
                      setEBook({
                        title: scripture.book,
                        content: JSON.parse(content),
                        date: new Date().toDateString(),
                      } as EBook),
                    );
                    dispatch(setRenderStyle("bible"));
                    dispatch(
                      setGlobalCurrentChapter(scripture.chapterNo.toString()),
                    );
                    dispatch(
                      setGlobalCurrentVerse(scripture.verseNo.toString()),
                    );
                    setTimeout(() => dispatch(setOpenState(true)), 100);
                  });
                }}
              >
                <PlayCircleIcon /> {scripture.book} {scripture.chapterNo}:
                {scripture.verseNo}
              </Button>
            ),
          },
        ]);
      });
      return true;
    } catch (error) {
      setMessageBlocks((prev) => [
        ...prev,
        {
          sender: "System" as const,
          type: "text",
          content:
            "Failure while parsing response from the model, You can safely retry now.",
        },
      ]);
      console.error(error);
      return false;
    }
  }

  async function handleMessageSend(msg: string) {
    if (!msg.trim()) return;
    setMessageBlocks((prev) => [
      ...prev,
      {
        sender: "User",
        type: "text",
        content: msg,
      },
    ]);
    scrollMessageBoxToBottom();
    setIsTyping(true);

    // Attach additional context to the message
    const attachedTheme = `-@here Note user's theme for appropriate styling: ${theme} mode`;
    const attachedBookState = `-@here Note user's current book state for your knowledge: ${eReaderState.eContent.title} ${eReaderState.currentChapter}:${eReaderState.currentVerse}`;

    // Attach date & time
    const attachedLocalTime = `-@here Note user's local time for context: ${new Date().toLocaleString()}`;
    const attachedCurrentDate = `-@here Note user's current date for context: ${new Date().toDateString()}`;
    const additionalContext = [
      attachedTheme,
      attachedBookState,
      attachedLocalTime,
      attachedCurrentDate,
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

    const msgPackData = msgpack.encode(conversation);
    const base64String = fromByteArray(new Uint8Array(msgPackData));

    askSchema.conversation = base64String;

    try {
      const data = await sendAskReq({
        message: JSON.stringify(askSchema),
      }).unwrap();

      await parseAIResponse(data);
    } catch (error) {
      console.error(error);
      setMessageBlocks((prev) => [
        ...prev,
        {
          sender: "System" as const,
          type: "text",
          content: "A connection error occurred. Please try again later.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  function handleSuggestionClick(msg: string) {
    const index = suggestions.indexOf(msg);
    if (index > -1) {
      setSuggestions((current) => {
        const updated = [...current];
        updated.splice(index, 1);
        return updated;
      });
    }
    // scrollMessageBoxToBottom();
    handleMessageSend(msg);
  }

  // Initial message
  useEffect(() => {
    setMessageBlocks([
      {
        sender: "AI",
        type: "text",
        content: "Hi! 🙏 How may I be of service to you?",
      },
    ]);
  }, []);

  useEffect(() => {
    scrollMessageBoxToBottom();
  }, [messageBlocks]);

  const [frameSetup, setFrameSetup] = useState(frameSetups.Top);

  useEffect(() => {
    if (isTyping) {
      const setups = [
        // frameSetups.VerticalBars,
        frameSetups.CornersNorthEast,
        // frameSetups.HorizontalBars,
        frameSetups.CornersSouthEast,
        // frameSetups.CornersSouthWest,
      ];
      let currentIndex = 0;

      const interval = setInterval(() => {
        setFrameSetup(setups[currentIndex]);
        currentIndex = (currentIndex + 1) % setups.length;
      }, 1000); // Change setup every second

      return () => clearInterval(interval);
    } else {
      setFrameSetup(frameSetups.Top);
    }
  }, [isTyping]);

  const AnimatedMessageBlock = ({
    block,
    onAnimated,
  }: {
    block: Block;
    onAnimated: () => void;
  }) => {
    const [blockMounted, setBlockMounted] = useState(false);
    useEffect(() => {
      setTimeout(() => {
        setBlockMounted(true);
        setTimeout(() => onAnimated(), 100);
      }, 1000);
    }, []);

    return blockMounted || block.sender === "User" ? (
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
        {block.sender === "AI" || block.sender === "User" ? (
          block.sender !== "User" ? (
            <div dangerouslySetInnerHTML={{ __html: block.content }} />
          ) : (
            <div>{block.content}</div>
          )
        ) : (
          <Card className="text-red-500 !flex !flex-col !items-center !gap-2">
            <AlertCircleIcon className="w-6 h-6" />
            <Text>{block.content}</Text>
            <Flex className="!flex-row !gap-2">
              <Button
                variant="soft"
                onClick={() => {
                  handleMessageSend(
                    messageBlocks[messageBlocks.length - 1].content,
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
      </Flex>
    ) : (
      <SkeletonTextBlock />
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
        className={`${className} !sticky !top-0 !h-[60vh] ${isTyping && "animate-pulse"}`}
      >
        {canvasView && (
          <>
            <BtnScrollUp />
            <BtnScrollDown />
          </>
        )}

        <Flex className="gap-1 mb-4 !flex-wrap p-6 max-w-[600px]">
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
          className={`${theme === "dark" ? "shadow rounded-lg" : ""} m-[1rem] box-content !scroll-smooth gap-6`}
        >
          {messageBlocks.map((block, index) => (
            <Flex key={index} justify="center" className={`!flex-col`}>
              <AnimatedMessageBlock
                block={block}
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
    <>
      <Card className="!p-0">
        {canvasView ? (
          <Flow
            nodes={[scrollAreaToNode()]}
            messageBlocksCount={countMessageBlocks()}
          />
        ) : (
          <ScrollAreaComponent />
        )}
        <Frame {...frameSetup} />
        <Flex
          direction="column"
          justify="center"
          className="text-center !flex-row !gap-2 !p-2 max-w-[400px] !m-auto"
        >
          <Carousel
            variant="no-scrollbar"
            items={executables.map((executable, idx) => (
              <React.Fragment key={`exe-${idx}`}>
                {executable.jsxTrigger}
              </React.Fragment>
            ))}
          />
        </Flex>
      </Card>
      <Text as="label" size="2">
        <Flex gap="2" className="!flex-row">
          <Flex className="!p-1">
            <Badge color="red" size="2">
              Beta Unstable
            </Badge>
          </Flex>
          <Flex className="!p-1">
            <Switch
              size="1"
              checked={canvasView}
              onClick={() => setCanvasView(!canvasView)}
            />
            <Text className="!ml-1">Canvas</Text>
          </Flex>
          <Flex className="!p-1">
            <Switch
              size="1"
              checked={Conversational}
              onClick={() => setConversational(!Conversational)}
            />
            <Text className="!ml-1">Converse</Text>
          </Flex>
        </Flex>
      </Text>
      <Chatbox
        disabled={isTyping}
        textContent={input}
        handleRecieve={(text: string) => handleMessageSend(text)}
      />
    </>
  );
};

export default ChristianAIChatbox;
