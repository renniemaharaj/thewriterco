import { Flex, Button, Separator } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useSendAskRequestMutation } from "../../app/api/apiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Chatbox from "./Chatbox";

const ChristianAIChatbox = ({ className }: { className?: string }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    [],
  );
  const [isTyping, setIsTyping] = useState(false);
  // const [isExpanded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const toastMessages = [
    "We are processing your request.",
    "Please be patient. This might take a moment.",
    "Thank you for waiting!",
    "In some cases, our servers may be spinning up. Please wait.",
  ];

  const eReaderState = useSelector((state: RootState) => state.ereader);

  type Context = {
    book: string;
    chapter: string | null;
    verse: string | null;
  };
  const [context, setContext] = useState<Context>({
    book: eReaderState.eContent.title,
    chapter: eReaderState.currentChapter,
    verse: eReaderState.currentVerse,
  });

  useEffect(() => {
    setContext({
      book: eReaderState.eContent.title,
      chapter: eReaderState.currentChapter,
      verse: eReaderState.currentVerse,
    });
    console.log("Context updated", context);
  }, [
    eReaderState,
    eReaderState.eContent.title,
    eReaderState.currentChapter,
    eReaderState.currentVerse,
  ]);

  const [sendAskRequest] = useSendAskRequestMutation();

  const animateAIResponse = (response: string) => {
    let currentText = "";

    let index = 0;
    const interval = setInterval(() => {
      if (index < response.length) {
        currentText += response[index];
        setMessages((prev) => {
          const updatedMessages = [...prev];
          if (updatedMessages[updatedMessages.length - 1]?.sender === "AI") {
            updatedMessages[updatedMessages.length - 1] = {
              sender: "AI",
              text: currentText,
            };
          } else {
            updatedMessages.push({ sender: "AI", text: currentText });
          }
          return updatedMessages;
        });
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setShowToast(false);
      }
    }, 0);
  };

  useEffect(() => {
    animateAIResponse(
      `
      
I'm here to help you study the Bible using the Holy Bible (KJV), historical records, biblical archeology and general knowledge of the world. My responses are shaped by three core truths, the Axioms of Life, ensuring consistency. I also track the book, chapter, and verse you're reading. How can I assist you today?
      `,
    );
  }, []);
  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "User",
      text: message,
    };
    setMessages((prev) => [...prev, userMessage]);

    // setInput("");

    try {
      setIsTyping(true);
      setShowToast(true);
      const response = await sendAskRequest({
        message:
          message +
          "\n Track the user's current book, chapter, and verse of the Bible. Acknowledge what they're reading and tailor responses or conversations to the scripture." +
          JSON.stringify(context),
      }).unwrap();

      const formattedResponse = response.response;
      animateAIResponse(formattedResponse);
    } catch (error) {
      const errorMessage = {
        sender: "AI",
        text: "Something went wrong. Please try again",
      };
      console.error(error);
      setMessages((prev) => [...prev, errorMessage]);
      setIsTyping(false);
      setShowToast(false);
    }
  };

  const [quickMessages, setQuickMessages] = useState<string[]>([
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
  ]);

  const onQuickMessageClick = (msg: string) => {
    //Remove quick message from the list
    const index = quickMessages.indexOf(msg);
    if (index > -1) {
      const updatedQuickMessages = [...quickMessages];
      updatedQuickMessages.splice(index, 1);
      setQuickMessages(updatedQuickMessages);
    }
    setInput(msg);
  };
  return (
    <div
      // direction="column"
      // justify="center"
      className={`${className}`}
    >
      {/* Quick Messages */}
      <Flex className="gap-1 mb-4 !flex-wrap">
        {quickMessages.map((msg, index) => (
          <Button
            key={index}
            variant="soft"
            className="cursor-pointer !sticky !top-0"
            onClick={() => onQuickMessageClick(msg)}
          >
            {msg}
          </Button>
        ))}
      </Flex>

      {/* Chat Display */}
      <Flex
        direction="column"
        className="max-h-[300px] mb-4 box-content rounded-md shadow-sm"
      >
        {messages.map((msg, index) => (
          <Flex
            key={index}
            justify={msg.sender === "User" ? "end" : "start"}
            className={`mb-2 ${msg.sender === "User" ? "text-right" : "text-left"} !text-sm`}
          >
            <div
              className="inline-block px-4 py-2 rounded-lg"
              dangerouslySetInnerHTML={{ __html: msg.text }}
            ></div>
          </Flex>
        ))}

        {isTyping && (
          <Flex justify="center" className="text-gray-500 italic">
            <span className="animate-pulse">...</span>
          </Flex>
        )}

        {showToast && (
          <div className="text-center mt-2 text-sm text-gray-600">
            {toastMessages[Math.floor(Math.random() * toastMessages.length)]}
          </div>
        )}
      </Flex>

      <Flex justify="center" className="text-sm text-gray-500">
        <Separator size="3" />
      </Flex>
      {/* Input Area */}
      <Flex align="center" justify="center" className="!gap-2 mt-4">
        {/* <Text
          multiple
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-auto max-w-[350px] border rounded-lg px-4 py-2 focus:outline-none max-h-[300px] overflow-auto"
        /> */}
        <Chatbox
          disabled={isTyping}
          textContent={input}
          handleRecieve={(input: string) => {
            handleSendMessage(input);
          }}
        />
        {/* <IconButton
          onClick={handleSendMessage}
          disabled={isLoading || !input.trim()}
        >
          <SendIcon aria-label="Send" />
        </IconButton> */}
      </Flex>
    </div>
  );
};

export default ChristianAIChatbox;
