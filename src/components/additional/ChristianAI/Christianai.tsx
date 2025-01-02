import { Flex, Button, Separator } from "@radix-ui/themes";
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

  const [input, setInput] = useState("");
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
          messageBoxRef.current?.scrollTo({
            top: messageBoxRef.current.scrollHeight,
            behavior: "smooth",
          });
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
    setInput(msg);
  }

  useEffect(() => {
    console.log("Executables", executables);
  }, [executables]);
  return (
    <div
      ref={messageBoxRef}
      className={`${className} !overflow-auto !sticky !top-0 !m-0 p-4 shadow-gray-200 h-[100vh]`}
    >
      <Flex className="gap-1 mb-4 !flex-wrap p-6">
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
        className={`${theme === "dark" ? "shadow rounded-lg" : ""} mb-4 box-content !scroll-smooth gap-6`}
      >
        {messageBlocks.map((block, index) => (
          <React.Fragment key={index}>
            <Flex
              direction="column"
              justify={block.sender === "User" ? "end" : "start"}
              className={`${theme === "dark" ? "!shadow-sm !shadow-gray-500" : "blurred-div"} ${
                block.sender === "User" ? "text-right !self-end" : "text-left"
              } min-h-10 max-w-[90%] !text-sm !max-h-fit !overflow-hidden !p-2`}
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
          <Flex justify="center" className="text-gray-500 italic">
            <span className="animate-pulse">...</span>
          </Flex>
        )}

        {showToast && (
          <div className="asbolute text-center mt-2 text-sm text-gray-600">
            {toastMessages[Math.floor(Math.random() * toastMessages.length)]}
          </div>
        )}
      </Flex>

      <Flex justify="center" className="text-sm text-gray-500">
        <Separator size="3" />
      </Flex>

      <Flex align="center" justify="center" className="!gap-2 mt-4">
        <Chatbox
          disabled={isTyping}
          textContent={input}
          handleRecieve={(text: string) => handleMessageSend(text)}
        />
      </Flex>
    </div>
  );
};

export default ChristianAIChatbox;
