import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Flex, IconButton, TextField, Card } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useSendAskRequestMutation } from "../../app/api/apiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Hint from "../Hint";

const ChristianAIChatbox = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    [],
  );
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessages] = useState([
    "We are processing your request.",
    "Please be patient. This might take a moment.",
    "Thank you for waiting!",
  ]);

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
  }, [eReaderState]);

  const [sendAskRequest, { isLoading }] = useSendAskRequestMutation();

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    type Message = {
      sender: string;
      text: string;
    };

    const userMessage: Message = {
      sender: "User",
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    try {
      setIsTyping(true);
      setShowToast(true);
      const response = await sendAskRequest({
        message: input + "\n Please utilize the following as context" + context,
      }).unwrap();

      const formattedResponse = response.response;
      let currentText = "";

      let index = 0;
      const interval = setInterval(() => {
        if (index < formattedResponse.length) {
          currentText += formattedResponse[index];
          setMessages((prev) => {
            const updatedMessages = [...prev];
            updatedMessages[updatedMessages.length - 1] = {
              sender: "AI",
              text: currentText,
            };
            return updatedMessages;
          });
          index++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          setShowToast(false);
        }
      }, 15); // Faster response animation
    } catch (error: unknown) {
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

  const quickMessages = [
    "Who is God?",
    "Why Christianity?",
    "What is your purpose?",
  ];

  return (
    <Flex
      direction="column"
      justify="center"
      className={`p-4 w-full max-w-[500px] mx-auto ${isExpanded ? "h-screen fixed top-0 left-0 z-100 blurred-div" : ""}`}
    >
      {/* Quick Messages */}
      <Flex className="gap-2 mb-4">
        {quickMessages.map((msg, index) => (
          <Card
            key={index}
            className="cursor-pointer px-4 py-2rounded-lg"
            onClick={() => setInput(msg)}
          >
            {msg}
          </Card>
        ))}
      </Flex>

      {/* Chat Display */}
      <Flex
        direction="column"
        className="overflow-y-auto max-h-[300px] mb-4 p-2 rounded-lg shadow-lg"
      >
        {messages.map((msg, index) => (
          <Flex
            key={index}
            justify={msg.sender === "User" ? "end" : "start"}
            className={`mb-2 ${msg.sender === "User" ? "text-right" : "text-left"}`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg 
              
              `}
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

      {/* Input Area */}
      <Flex align="center" justify={"center"} className="!gap-2 mt-4">
        <TextField.Root
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full max-w-[350px] border rounded-lg px-4 py-2 focus:outline-none max-h-[300px] overflow-auto"
        />
        <IconButton
          onClick={handleSendMessage}
          disabled={isLoading || !input.trim()}
          // className="bg-blue-500 text-white hover:bg-blue-600"
        >
          <MagnifyingGlassIcon aria-label="Send" />
        </IconButton>
        {/* <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-2 px-4 py-2 border rounded-lg"
        >
          {isExpanded ? "Close" : "Expand"}
        </Button> */}
      </Flex>
      <Hint>
        AI powered responses, purified by The axioms of Life. This feature is at
        most, experimental for now as we need to sort out billing on our end for
        the SASS, but would preferrably be free for all users.
      </Hint>
    </Flex>
  );
};

export default ChristianAIChatbox;
