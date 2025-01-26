import { Card, Flex } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

interface ChatboxProps {
  handleRecieve: (input: string) => void;
  disabled: boolean;
  textContent: string;
}

const Chatbox: React.FC<ChatboxProps> = ({
  handleRecieve,
  disabled,
  textContent,
}) => {
  const [message, setMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setIsDisabled(disabled);
    console.log("Disabled:", disabled);
  }, [disabled]);

  useEffect(() => {
    if (textContent) {
      setMessage(textContent);
    }
  }, [textContent]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    setMessage(textarea.value);

    // Adjust textarea height dynamically while limiting max-height
    textarea.style.height = "auto"; // Reset height
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`; // Adjust height within limit
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isDisabled) return;
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage(""); // Clear the input
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "auto"; // Reset height to default
      }
      textAreaRef.current?.focus(); // Focus on the input
      handleRecieve(message.replace(/\\n/g, "\n")); // Pass the message
    }
  };

  const [chatboxFocus, setChatboxFocus] = useState(false);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.addEventListener("focus", () => {
        setChatboxFocus(true);
      });
      textAreaRef.current.addEventListener("blur", () => {
        setChatboxFocus(false);
      });
    }
  }, []);

  return (
    <Card
      className={`${
        chatboxFocus ? " border-[#978365] " : "border-transparent"
      } w-[75%] m-auto !h-auto border-2 outline-none  !flex !gap-2 mt-4 !overflow-auto`}
    >
      <textarea
        ref={textAreaRef}
        disabled={isDisabled}
        className="flex-1 border-none outline-none resize-none text-sm p-2 bg-transparent max-h-[150px]"
        placeholder="What would you like help with?"
        rows={1}
        value={message}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
      />

      <Flex align={"end"} justify={"end"} className="flex gap-2">
        <button
          className="ml-2 p-2 text-yellow-500 hover:text-yellow-700 !self-end"
          onClick={sendMessage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9" />
          </svg>
        </button>
      </Flex>
    </Card>
  );
};

export default Chatbox;
