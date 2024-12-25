import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Flex, IconButton, TextField } from "@radix-ui/themes";
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
  const [isTyping, setIsTyping] = useState(false); // State for typing animation

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
    // Add user input to the chat
    const userMessage: Message = {
      sender: "User",
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);

    // Clear the input field
    setInput("");

    // Send the user input to the AI
    try {
      setIsTyping(true); // Show typing animation

      const response = await sendAskRequest({
        message: input + "\n Please utilize the following as context" + context,
      }).unwrap();

      const formattedResponse = response.response;
      let currentText = ""; // Text being built progressively

      // setMessages((prev) => [
      //   ...prev,
      //   { sender: "AI", text: "Hello, what can I help you with today?" }, // Empty AI message for starting
      // ]);

      // Set the interval for typing animation
      let index = 0;
      const interval = setInterval(() => {
        if (index < formattedResponse.length) {
          // Reveal character by character
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
          clearInterval(interval); // Stop the animation once all content is revealed
          setIsTyping(false); // Hide typing animation once finished
        }
      }, 30); // Adjust delay (in ms) between characters for typing effect
    } catch (error: unknown) {
      const errorMessage = {
        sender: "AI",
        text: "Something went wrong. Please try again",
      };
      console.error(error);
      setMessages((prev) => [...prev, errorMessage]);
      setIsTyping(false); // Hide typing animation on error
    }
  };

  return (
    <Flex
      direction="column"
      justify="center"
      className="p-4 w-full max-w-[500px] mx-auto"
    >
      {/* Chat Display */}
      <Flex
        direction="column"
        className="overflow-y-auto max-h-[400px] mb-4 p-2 rounded-lg shadow-lg"
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
              dangerouslySetInnerHTML={{ __html: msg.text }} // Render HTML markup
            ></div>
          </Flex>
        ))}

        {isTyping && (
          <Flex justify="center" className="text-gray-500 italic">
            <span className="animate-pulse">...</span>
          </Flex>
        )}
      </Flex>

      {/* Input Area */}
      <Flex align="center" className="!gap-2 mt-4">
        <TextField.Root
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full max-w-[350px] border rounded-lg px-4 py-2 focus:outline-none"
        />
        <IconButton
          onClick={handleSendMessage}
          disabled={isLoading || !input.trim()}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          <MagnifyingGlassIcon aria-label="Send" />
        </IconButton>
      </Flex>
      <Hint>AI powered responses, purified by The axioms of Life. </Hint>
    </Flex>
  );
};

export default ChristianAIChatbox;
