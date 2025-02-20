import { Button, Card, Flex } from "@radix-ui/themes";
import { ArrowUpIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

interface InputProps {
  handleRecieve: (input: string) => void;
  disabled: boolean;
  children?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ handleRecieve, disabled, children }) => {
  const [message, setMessage] = useState("");
  const [InputFocus, setInputFocus] = useState(false);

  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    setMessage(textarea.value);

    // Adjust textarea height dynamically while limiting max-height
    textarea.style.height = "auto"; // Reset height
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`; // Adjust height within limit
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (disabled) return;
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const resetTextArea = () => {
    setMessage(""); // Clear the input
    if (!textAreaRef.current) return;
    textAreaRef.current.style.height = "auto"; // Reset height to default
    textAreaRef.current?.focus(); // Focus on the input
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    handleRecieve(message.replace(/\\n/g, "\n")); // Pass the message to the parent component
    resetTextArea();
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.addEventListener("focus", () => {
        setInputFocus(true);
      });
      textAreaRef.current.addEventListener("blur", () => {
        setInputFocus(false);
      });
    }

    return () => {
      if (textAreaRef.current) {
        textAreaRef.current.removeEventListener("focus", () => {
          setInputFocus(true);
        });
        textAreaRef.current.removeEventListener("blur", () => {
          setInputFocus(false);
        });
      }
    };
  }, []);

  // For future use
  // const extraToolIconClassNames =
  //   "text-yellow-500 hover:text-yellow-700 cursor-pointer scale-75";
  return (
    // <Flex className="!h-[25vh] !w-full">
    <Card
      className={`${
        InputFocus ? " border-[#978365] " : "border-transparent"
      } !absolute left-[50%] translate-x-[-50%] !bottom-0 !h-auto !w-[90%] border-2 outline-none !flex !flex-col !gap-2 mt-4 `}
    >
      {/* <Flex> */}
      <Flex align={"center"} className="flex gap-2 !w-full !justify-evenly">
        <textarea
          ref={textAreaRef}
          disabled={disabled}
          className="scrollbar-hide flex-1 border-none outline-none resize-none text-sm p-2 bg-transparent !max-h-[3rem]"
          placeholder="What would you like help with?"
          rows={1}
          value={message}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
        />
        <Flex className="flex !gap-2 !align-middle !justify-center">
          {message.trim() && (
            <Button onClick={sendMessage} variant="soft">
              <ArrowUpIcon />
            </Button>
          )}
          {/* <NetworkIcon className={`${extraToolIconClassNames}`} /> */}
        </Flex>
      </Flex>
      {/* </Flex> */}
      {children}
    </Card>
    // </Flex>
  );
};

export default Input;
