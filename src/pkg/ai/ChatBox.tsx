import { Flex, Button } from "@radix-ui/themes";
import {
  useCallback,
  useImperativeHandle,
  useEffect,
  useRef,
  forwardRef,
  useState,
} from "react";
// import { useSendAskReqMutation } from "../../app/api/apiSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store.ts";

import {
  Block,
  Code,
  MarkupResponse,
  ResponseBlock,
  Scripture,
} from "./types.ts";
import { setOpenState } from "../../app/reader/readerSlice.ts";

import * as msgpack from "@msgpack/msgpack";
// import { fromByteArray } from "base64-js";
import Input from "./Input.tsx";
import {
  addMessage,
  clearMessages,
  nukeSystemMessages,
  setConversationTokens,
} from "../../app/chat/chatSlice.ts";
import { buildConversation } from "./utils.ts";
import useLocalStorage from "../hooks/useLocalStorage.ts";
import Models from "./Models.tsx";
import { prompt } from "../firebase/ai/ai.ts";
import View from "./View.tsx";
import { initialState } from "../../app/chat/config.ts";

const ChatBox = forwardRef(
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
    const dispatch = useDispatch();
    // const [sendAskReq] = useSendAskReqMutation();

    const [isTyping, setIsTyping] = useState(false);
    const [maxTokens, setMaxTokens] = useState(10000);

    const eReaderState = useSelector((state: RootState) => state.reader);

    const chatState = useSelector((state: RootState) => state.chat);

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
            setValue(initialState);
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
      [dispatch, dispatchAddMessage, setValue],
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
        const attachedBookState = `${eReaderState.eBook.title} ${eReaderState.currentChapter}:${eReaderState.currentVerse}`;

        const attachedResponseConstraint = chatState.responseConstraint;
        const context = [
          { themeMode: "Please don't use custom colors styles" },
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

        // const msgPackData = msgpack.encode(conversation);
        // const base64String = fromByteArray(new Uint8Array(msgPackData));

        // askSchema.encoded = base64String;

        askSchema.encoded = JSON.stringify(conversation);

        let data = { response: "" };

        try {
          // data = await sendAskReq({
          //   message: JSON.stringify(askSchema),
          // }).unwrap();
          const result = await prompt(JSON.stringify(askSchema));
          if (result) data = { response: result };
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
        handleCommand,
        chatState,
        dispatchAddMessage,
        eReaderState,
        maxTokens,
        // sendAskReq,
        scrollMessageBoxToBottom,
        parseAIResponse,
      ],
    );

    // Expose methods to parent via ref
    useImperativeHandle(ref, () => ({
      handleMessageSend,
    }));

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
    }, [chatState.messages, computeTokens, dispatch, scrollMessageBoxToBottom]);

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

    return (
      <Flex ref={chatRef} className={`${className} !pb-32`}>
        <View
          isTyping={isTyping}
          handleMessageSend={handleMessageSend}
          scrollMessageBoxToBottom={scrollMessageBoxToBottom}
        />

        <Input
          disabled={isTyping}
          handleRecieve={(text: string) => handleMessageSend(text)}
          className={`!absolute md:bottom-[1rem] bottom-[0.1rem] animate-fade-in  blurred-div`}
          style={{ width: chatBoxRespectiveWidth }}
          children={
            <Flex gap="2" className="!flex-row">
              <Flex align={"center"} className="!p-1 gap-2 !flex-wrap">
                <Models />
                <Button
                  variant={"outline"}
                  onClick={() => dispatch(setOpenState(true))}
                >
                  Bible
                </Button>
              </Flex>
            </Flex>
          }
        />
      </Flex>
    );
  },
);

export default ChatBox;
