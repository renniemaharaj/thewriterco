import { Card } from "@radix-ui/themes";
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
    setMessage(event.target.value);
    event.target.style.height = "auto"; // Reset height
    event.target.style.height = `${event.target.scrollHeight}px`; // Adjust height
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
      console.log("Sending message:", message); // Replace this with your send logic
      setMessage(""); // Clear the input
      handleRecieve(message); // Pass the message
    }
  };

  return (
    <Card variant="surface" className="!w-[90%] mx-auto !flex !items-center">
      <textarea
        disabled={isDisabled}
        className="flex-1 border-none outline-none resize-none text-sm p-2 !bg-transparent"
        placeholder="Ask a difficult question..."
        rows={1}
        value={message}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
      />
      <button
        className="ml-2 p-2 text-yellow-500 hover:text-yellow-700"
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
    </Card>
  );
};

export default Chatbox;
