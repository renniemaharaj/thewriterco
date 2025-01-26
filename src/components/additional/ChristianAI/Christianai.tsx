import { Flex, Button, ScrollArea, Card, Skeleton } from "@radix-ui/themes";
import React, { useEffect, useRef, useState } from "react";
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
import { PlayCircleIcon } from "lucide-react";
import { parseCodeBlocks } from "./utils.tsx";
import { Block, Context, Executable, TaskAlterBookState } from "./types";
import { toastMessages } from "./configuration.ts";
import { taskExtractor } from "./utils.ts";
import { Carousel } from "../Carousel.tsx";
import Hint from "../../Hint.tsx";

const ChristianAIChatbox = ({ className }: { className?: string }) => {
  const dispatch = useDispatch();
  const { theme } = useThemeContext();

  const [input] = useState("");
  const [messageBlocks, setMessageBlocks] = useState<Block[]>([]);
  const [executables, setExecutables] = useState<Executable[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showToast, setShowToast] = useState(false);
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
      setShowToast(true);
      const data = await sendAskReq({ message: msg }).unwrap();
      const lintedResponse = linters.reduce((acc, linter) => {
        return acc.replace(new RegExp(linter, "g"), "<br/>");
      }, data.response);
      console.log("Linted response", lintedResponse);
      const newBlocks = parseCodeBlocks(lintedResponse);

      (function addBlocksSequentially(index = 0) {
        if (index >= newBlocks.length) {
          setIsTyping(false);
          setShowToast(false);
          return;
        }
        setTimeout(() => {
          setMessageBlocks((prev) => [...prev, newBlocks[index]]);
          scrollMessageBoxToBottom();
          addBlocksSequentially(index + 1);
        }, 500);
      })();

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
      setShowToast(false);
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

  const baseFrameClassName = "!absolute blurred-div-light !z-10";
  const simulateFrameClassNames = [
    `${baseFrameClassName} !top-0 !left-0 !w-full !h-[1rem]`, // Top frame (1rem height, full width)
    `${baseFrameClassName} !top-0 !right-0 !h-full !w-[1rem]`, // Right frame (1rem width, full height)
    // `${baseFrameClassName} !bottom-0 !left-0 !w-full !h-[1rem]`, // Bottom frame (1rem height, full width)
    `${baseFrameClassName} !top-0 !left-0 !h-full !w-[1rem]`, // Left frame (1rem width, full height)
  ];
  return (
    <>
      <Card className="!p-0">
        {simulateFrameClassNames.map((className, index) => (
          <Skeleton key={index} className={className} />
        ))}
        <ScrollArea
          // scrollHideDelay={500}
          // type="scroll"
          // style={{ scrollBehavior: "smooth" }}
          ref={messageBoxRef}
          className={`${className} !sticky !top-0 !h-[60vh]`}
        >
          <Flex className="gap-1 mb-4 !flex-wrap p-6 max-w-[600px]">
            {suggestions.map((msg, index) => (
              <Button
                key={index}
                variant="soft"
                className="cursor-pointer"
                onClick={() => handleSuggestionClick(msg)}
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
              <React.Fragment key={index}>
                <Flex
                  direction="column"
                  justify={block.sender === "User" ? "end" : "start"}
                  className={`${
                    block.sender === "User"
                      ? "text-right !self-end"
                      : "text-left"
                  } min-h-10 max-w-[90%] !text-sm !max-h-fit !overflow-hidden !p-2 opacity-0 animate-fade-in`}
                  style={{
                    animationDuration: "0.5s",
                    animationFillMode: "forwards",
                  }}
                >
                  {block.jsxElem}
                </Flex>
              </React.Fragment>
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
                <Skeleton className="h-4 rounded w-3/4 mb-2" />
                <Skeleton className="h-4 rounded w-2/4 mb-2" />
                <Skeleton className="h-4 rounded w-1/4" />
              </Flex>
            )}

            {showToast && (
              <div className="asbolute text-center mt-2 text-sm text-gray-600">
                {
                  toastMessages[
                    Math.floor(Math.random() * toastMessages.length)
                  ]
                }
              </div>
            )}
          </Flex>

          {/* <Flex justify="center" className="text-sm text-gray-500">
            <Separator size="3" />
          </Flex> */}

          {/* <Flex className="max-h-[100px] !overflow-auto w-[100%]"> */}

          {/* </Flex> */}
        </ScrollArea>
      </Card>
      <Chatbox
        disabled={isTyping}
        textContent={input}
        handleRecieve={(text: string) => handleMessageSend(text)}
      />
    </>
  );
};

export default ChristianAIChatbox;
