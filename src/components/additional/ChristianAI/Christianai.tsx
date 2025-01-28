import {
  Flex,
  Button,
  ScrollArea,
  Card,
  Skeleton,
  Switch,
  Text,
} from "@radix-ui/themes";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSendAskReqMutation } from "../../../app/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import Chatbox from "../Chatbox";
import { useThemeContext } from "../../context/useThemeContext";
import fetchGitBlob from "../articles/utils/bible/gitgetter";
import {
  setEBook,
  setGlobalCurrentChapter,
  setGlobalCurrentVerse,
  setOpenState,
  setRenderStyle,
} from "../../../app/ereader/ereaderSlice";
import { EBook } from "../../../app/ereader/types";
import { ChevronDownIcon, ChevronUpIcon, PlayCircleIcon } from "lucide-react";
import { parseCodeBlocks } from "./utils.tsx";
import { Block, Context, Executable, TaskAlterBookState } from "./types";
import { taskExtractor } from "./utils.ts";
import { Carousel } from "../Carousel.tsx";
import Hint from "../../Hint.tsx";
import Frame from "../../frames/Frame.tsx";
import { frameSetups } from "../../frames/frameVarients.ts";
import Flow from "../../flow/Flow.tsx";
import { Node } from "@xyflow/react";

const ChristianAIChatbox = ({ className }: { className?: string }) => {
  const dispatch = useDispatch();
  const { theme } = useThemeContext();

  const [input] = useState("");
  const [messageBlocks, setMessageBlocks] = useState<Block[]>([]);
  const [executables, setExecutables] = useState<Executable[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  // const [showToast, setShowToast] = useState(false);
  const messageBoxRef = useRef<HTMLDivElement>(null);

  const eReaderState = useSelector((state: RootState) => state.ereader);
  const [sendAskReq] = useSendAskReqMutation();

  const [, setContext] = useState<Context>({
    book: eReaderState.eContent.title,
    chapter: eReaderState.currentChapter,
    verse: eReaderState.currentVerse,
  });

  const scrollMessageBoxToBottom = () => {
    messageBoxRef.current?.scrollTo({
      top: messageBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setContext({
      book:
        eReaderState.eContent.title === "Bible"
          ? "none_selected"
          : eReaderState.eContent.title,
      chapter: eReaderState.currentChapter,
      verse: eReaderState.currentVerse,
    });
  }, [
    eReaderState.eContent.title,
    eReaderState.currentChapter,
    eReaderState.currentVerse,
  ]);

  async function handleMessageSend(msg: string) {
    const linters = [
      "&lt;br&gt;&lt;br;",
      "&lt;br&gt;&lt;br&gt;",
      "&lt;br&gt;",
      "r&gt;&lt;br&gt;",
    ];

    if (!msg.trim()) return;
    setMessageBlocks((prev) => [
      ...prev,
      {
        sender: "User",
        type: "text",
        content: msg,
        jsxElem: <div>{msg}</div>,
      },
    ]);

    try {
      setIsTyping(true);
      // setShowToast(true);
      const data = await sendAskReq({ message: msg }).unwrap();
      const lintedResponse = linters.reduce((acc, linter) => {
        return acc.replace(new RegExp(linter, "g"), "<br/>");
      }, data.response);
      console.log("Linted response", lintedResponse);
      const newBlocks = parseCodeBlocks(lintedResponse);

      setMessageBlocks((prev) => [...prev, ...newBlocks]);
      setIsTyping(false);
      // setShowToast(false);
      // scrollMessageBoxToBottom();

      const { tasks } = taskExtractor(data.response);
      tasks.forEach((task: TaskAlterBookState) => {
        if (task && task.task && task.task === "signalToUserBookState") {
          setExecutables((prev) => [
            ...prev,
            {
              jsxTrigger: (
                <Button
                  variant="ghost"
                  size="1"
                  className="animate-pulse !font-bold"
                  onClick={() => {
                    fetchGitBlob(task.book).then((content) => {
                      dispatch(
                        setEBook({
                          title: task.book,
                          content: JSON.parse(content),
                          date: new Date().toDateString(),
                        } as EBook),
                      );
                      dispatch(setRenderStyle("bible"));
                      dispatch(setGlobalCurrentChapter(task.chapter));
                      dispatch(setGlobalCurrentVerse(task.verse));
                      setTimeout(() => dispatch(setOpenState(true)), 100);
                    });
                  }}
                >
                  <PlayCircleIcon /> {task.book} {task.chapter}:{task.verse}
                </Button>
              ),
            },
          ]);
        } else {
          console.log("Task not recognized", task);
        }
      });
    } catch (error: unknown) {
      setMessageBlocks((prev) => [
        ...prev,
        {
          sender: "AI",
          type: "text",
          content: "Model failed to provide valid signal",
          jsxElem: (
            <Hint className="max-w-[300px]">
              Bug catcher, a bug was caught. Please try again.
            </Hint>
          ),
        },
      ]);
      setIsTyping(false);
      // setShowToast(false);
      console.error("Error", error);
    }
  }

  const [suggestions, setSuggestions] = useState<string[]>([
    "Who is God?",
    "Why Christianity?",
    "Is AI evil?",
    "How can I be saved?",
    "Was the bible written by man?",
    "The bible promotes slavery?",
    "White Jesus?",
    "What is the Gospel?",
    "Which denomination is right?",
    "Explain the Axioms",
    "Please open John 3:16",
  ]);

  function handleSuggestionClick(msg: string) {
    const index = suggestions.indexOf(msg);
    if (index > -1) {
      setSuggestions((current) => {
        const updated = [...current];
        updated.splice(index, 1);
        return updated;
      });
    }
    // setInput(msg);
    scrollMessageBoxToBottom();
    handleMessageSend(msg);
  }

  useEffect(() => {
    console.log("Executables", executables);
  }, [executables]);

  useEffect(() => {
    const onboardingMessages = [
      "Hello, I am TheWriterCoAI, my responses are generated based off of a theistic worldview; on the premises that God exists, the KJV Bible is true, and Jesus Christ has already came only once.",
      "Please allow up to one minute for an initial response as our servers are currently being hosted on a free tier and may take some time to spin up.",
    ];
    const initialBlocks = parseCodeBlocks(onboardingMessages.join("\n"));
    setMessageBlocks(initialBlocks);
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
        {block.jsxElem}
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

  const [canvasView, setCanvasView] = useState(false);

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

          <Flex
            direction="column"
            justify="center"
            className="text-center !flex-row !gap-2 !p-2"
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
  const scrollAreaToNode: Node = {
    id: "scroll-area",
    type: "scrollArea",
    data: {
      label: "Scroll Area",
      children: <ScrollAreaComponent />,
    },
    position: { x: 0, y: 0 },
  };

  return (
    <>
      <Card className="!p-0">
        {canvasView ? (
          <Flow nodes={[scrollAreaToNode]} />
        ) : (
          <ScrollAreaComponent />
        )}
        <Frame {...frameSetup} />
      </Card>
      <Text as="label" size="2">
        <Flex gap="2" className="!p-1">
          <Switch
            size="1"
            checked={canvasView}
            onClick={() => setCanvasView(!canvasView)}
          />
          Canvas
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
