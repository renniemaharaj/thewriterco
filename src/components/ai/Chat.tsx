import {
  Flex,
  Button,
  Skeleton,
  Card,
  Avatar,
  Blockquote,
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
  Block,
  Code,
  MarkupResponse,
  ResponseBlock,
  Scripture,
} from "./types.ts";
import Flow from "../flow/Flow.tsx";
import { Node } from "@xyflow/react";
import React from "react";
import { setOpenState } from "../../app/ereader/ereaderSlice.ts";

import * as msgpack from "@msgpack/msgpack";
import { fromByteArray } from "base64-js";
import Input from "./Input.tsx";
import {
  addMessage,
  clearMessages,
  nukeSystemMessages,
  setConversationMode,
  setConversationTokens,
  setViewMode,
} from "../../app/chat/chatSlice.ts";
import { buildConversation } from "./utils.ts";
import { initialSuggestions } from "./configuration.ts";
import useLocalStorage from "../hooks/useLocalStorage.ts";
import Message, { MessageAction } from "./Message.tsx";
import { toggleFlowSlice } from "../../app/flow/flowSlice.ts";
import { getInitialChatState } from "../../app/chat/utils.ts";

const Chat = forwardRef(
  (
    {
      className,
      scrollMessageBoxToBottom,
    }: {
      className?: string;
      scrollMessageBoxToBottom: () => void;
    },
    ref,
  ) => {
    const { theme } = useThemeContext();

    const dispatch = useDispatch();
    const [sendAskReq] = useSendAskReqMutation();

    const [isTyping, setIsTyping] = useState(false);
    const [maxTokens, setMaxTokens] = useState(10000);

    const [suggestions, setSuggestions] =
      useState<string[]>(initialSuggestions);

    const eReaderState = useSelector((state: RootState) => state.ereader);

    const chatState = useSelector((state: RootState) => state.chat);

    // const [chatState, setChatState] = useState(getInitialChatState());
    const [, setValue] = useLocalStorage("chatData", chatState);

    // Update local storage when chat state changes
    useEffect(() => {
      setValue(chatState);
    }, [chatState, setValue]);

    const dispatchAddMessage = useCallback(
      (content: Block) => {
        dispatch(addMessage(content));
      },
      [dispatch],
    );

    // Parse AI response
    const parseAIResponse = useCallback(
      async (data: { response: string }) => {
        try {
          const genaiResponse = JSON.parse(data.response);

          // Ensure responseBlocks exist
          if (!genaiResponse.responseBlocks) {
            throw new Error(
              "Invalid AI response format: Missing responseBlocks",
            );
          }

          // Iterate through responseBlocks and handle different content types
          genaiResponse.responseBlocks.forEach((block: ResponseBlock) => {
            switch (block.type) {
              case "markup":
                dispatchAddMessage({
                  role: "model",
                  type: "markup",
                  content: block.content as MarkupResponse,
                });
                break;

              case "scripture":
                // Process scripture content
                dispatchAddMessage({
                  role: "model",
                  type: "scripture",
                  content: block.content as Scripture,
                });

                break;

              case "code":
                // Process code content
                dispatchAddMessage({
                  role: "model",
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
              role: "system",
              type: "markup",
              content: {
                type: "markup",
                markupContent: data.response,
              },
            });
          }
          console.error("Error parsing AI response:", error);
        }
      },
      [dispatchAddMessage],
    );

    const handleCommand = useCallback(
      (command: string, args: string[]) => {
        switch (command) {
          case "clear":
            dispatch(clearMessages());
            break;

          case "nuke":
            dispatch(nukeSystemMessages());
            break;

          case "reset":
            dispatch(clearMessages());
            setValue(getInitialChatState());
            location.reload();
            break;

          case "tokens":
            if (args.length > 0) {
              const newMaxTokens = parseInt(args[0]);
              if (newMaxTokens > 0) {
                setMaxTokens(newMaxTokens);
              }
            }
            break;
          default:
            dispatchAddMessage({
              role: "system",
              type: "markup",
              content: {
                type: "markup",
                markupContent: "Unknown command.",
              },
            });
        }
      },
      [dispatch, dispatchAddMessage],
    );

    const handleMessageSend = useCallback(
      async (msg: string, defaultSending = true) => {
        if (!msg.trim()) return;

        // Handle commands
        if (msg.startsWith("/")) {
          const arg = msg.replace("/", "").split(" ");
          handleCommand(arg[0], arg.slice(1));
          return;
        }

        if (defaultSending) {
          dispatchAddMessage({
            role: "user",
            type: "markup",
            content: {
              type: "markup",
              markupContent: msg,
            },
          });
        }

        if (chatState.conversationTokens > maxTokens) {
          if (defaultSending && chatState.conversationMode !== "none") {
            dispatchAddMessage({
              role: "system",
              type: "markup",
              content: {
                type: "markup",
                markupContent:
                  "Conversation limit reached, please start a new chat.",
              },
            });
            return;
          }
        }

        scrollMessageBoxToBottom();
        setIsTyping(true);

        // Attach additional context to the message
        const attachedBookState = `${eReaderState.eContent.title} ${eReaderState.currentChapter}:${eReaderState.currentVerse}`;

        const attachedResponseConstraint = chatState.responseConstraint;
        const context = [
          { themeMode: "should support both light and dark modes" },
          { bookState: attachedBookState },
          { responseConstraint: attachedResponseConstraint },
          {
            constraintInstruction:
              "responseConstraint is a value from the union: shorter | short | detailed where detailed is 70+ words",
          },
        ];

        // Build ask schema
        const askSchema = {
          encoded: "",
          context,
        };

        let conversation;

        if (chatState.conversationMode === "exchange") {
          conversation = await buildConversation(chatState.messages, {
            role: "user",
            content: msg,
          });
        } else {
          conversation = await buildConversation([], {
            role: "user",
            content: msg,
          });
        }

        const msgPackData = msgpack.encode(conversation);
        const base64String = fromByteArray(new Uint8Array(msgPackData));

        askSchema.encoded = base64String;

        let data = { response: "" };

        try {
          data = await sendAskReq({
            message: JSON.stringify(askSchema),
          }).unwrap();
        } catch (error) {
          console.error(error);
          dispatchAddMessage({
            role: "system",
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
            role: "system",
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
      },
      [
        chatState,
        dispatchAddMessage,
        eReaderState,
        maxTokens,
        sendAskReq,
        theme,
        scrollMessageBoxToBottom,
        parseAIResponse,
      ],
    );

    // Expose methods to parent via ref
    useImperativeHandle(ref, () => ({
      handleMessageSend,
    }));

    const handleSuggestionClick = useCallback(
      (msg: string) => {
        setSuggestions((prev) =>
          prev.filter((suggestion) => suggestion !== msg),
        );
        handleMessageSend(msg);
      },
      [handleMessageSend, setSuggestions],
    );

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

      dispatch(toggleFlowSlice());
    }, [chatState.messages, computeTokens, dispatch, scrollMessageBoxToBottom]);

    const handleActions = (action: MessageAction) => {
      switch (action) {
        case "fix":
          handleMessageSend(
            "-@here Respond correctly, in defined schema. Validation failing.",
            false,
          );
          dispatch(nukeSystemMessages());

          break;
      }
    };

    const MessageBlock = ({
      block,
      onAnimated,
    }: {
      block: Block;
      onAnimated: () => void;
    }) => {
      useEffect(() => {
        onAnimated();
      }, [onAnimated]);
      return (
        <Message
          block={block}
          handleAction={
            block.role === "system"
              ? (action: MessageAction) => handleActions(action)
              : () => {}
          }
        />
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
        <Card
          variant="ghost"
          className="!flex !flex-col !max-w-[99%] !mx-auto !text-xs !justify-center !my-10 "
        >
          <Avatar
            color="gold"
            size={"1"}
            className={`h-6 w-6 relative ml-2 !my-10 !animate-bounce`}
            fallback="M"
          >
            {"M"}
          </Avatar>

          <Blockquote>
            <Skeleton
              className={`${blockMounted && "animate-fade-in opacity-100"} ${baseClassName} !w-[70%] mt-5 delay-100`}
            />
            <Skeleton
              className={`${blockMounted && "animate-fade-in opacity-100"} ${baseClassName} !w-2/4 delay-200`}
            />
            <Skeleton
              className={`${blockMounted && "animate-fade-in opacity-100"} ${baseClassName} !w-1/4 delay-300`}
            />
          </Blockquote>
        </Card>
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
        <Card
          className={`${isTyping && "animate-pulse"} flex-col !w-full !h-fit !pb-32 my-auto`}
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
        </Card>
      );
    }, [
      chatState,
      isTyping,
      suggestions,
      handleSuggestionClick,
      scrollMessageBoxToBottom,
    ]);

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
      [ViewContainer],
    );

    return (
      <Flex ref={chatRef} className={`${className} !pb-32`}>
        {/* <Card className="bg-red-400 !top-0" variant="ghost"> */}
        {/* {canvasView ? ( */}
        {chatState.viewMode === "canvas" ? (
          <Card className="!w-full h-[99vh] !pb-28">
            <Flow
              nodes={[MessageContainerNode()]}
              messageBlocksCount={countMessageBlocks()}
            />
          </Card>
        ) : (
          <ViewContainer />
        )}

        <Input
          disabled={isTyping}
          handleRecieve={(text: string) => handleMessageSend(text)}
          className={`!absolute ${chatState.messageBoxMode === "hidden" && "!hidden"} bottom-[2px] blurred-div`}
          style={{ width: chatBoxRespectiveWidth }}
          children={
            <Flex gap="2" className="!flex-row">
              <Flex align={"center"} className="!p-1 gap-2 !flex-wrap">
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
                      " / " +
                      maxTokens +
                      ")"
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
