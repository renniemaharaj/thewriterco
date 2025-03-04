import { Button, Card, Flex } from "@radix-ui/themes";
import { ArrowUpIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface InputProps {
  handleRecieve: (input: string) => void;
  disabled: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Input: React.FC<InputProps> = ({
  handleRecieve,
  disabled,
  children,
  className,
  style,
}) => {
  const [message, setMessage] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (disabled) return;
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    handleRecieve(message);
    setMessage("");
  };

  useEffect(() => {
    const handleFocus = () => setInputFocus(true);
    const handleBlur = () => setInputFocus(false);

    const shallowTextAreaRef = textAreaRef.current;
    shallowTextAreaRef?.addEventListener("focus", handleFocus);
    shallowTextAreaRef?.addEventListener("blur", handleBlur);

    return () => {
      shallowTextAreaRef?.removeEventListener("focus", handleFocus);
      shallowTextAreaRef?.removeEventListener("blur", handleBlur);
    };
  }, []);

  return (
    <Card
      style={style}
      className={`${className} ${
        inputFocus ? "border-[#978365]" : "border-transparent"
      } w-[100%] border-2 outline-none !flex !flex-col !gap-2 `}
    >
      <Flex align="center" className="flex gap-2 !w-full !justify-evenly">
        <TextareaAutosize
          ref={textAreaRef}
          disabled={disabled}
          className="scrollbar-hide flex-1 border-none outline-none resize-none text-sm p-2 bg-transparent max-h-[150px]"
          placeholder="What would you like help with?"
          minRows={1}
          maxRows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {message.trim() && (
          <Button onClick={sendMessage} variant="soft">
            <ArrowUpIcon />
          </Button>
        )}
      </Flex>
      {children}
    </Card>
  );
};

export default Input;
