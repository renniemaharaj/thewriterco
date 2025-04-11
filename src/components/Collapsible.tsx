import { ReactNode, useCallback, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button, Flex, ScrollArea } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { useThemeContext } from "./context/theme/useThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { toggleReasoningTitle } from "../app/reasoning/reasoningSlice";

type CollapsibleProps = {
  title: ReactNode;
  children: React.ReactNode;
  maxHeight?: string;
  className?: string;
  onOpen?: (content: ReactNode) => void;
  onClose?: () => void;
  handledChildren?: boolean;
};

export default function Collapsible({
  title,
  children,
  maxHeight = "200px",
  className,
  onOpen,
  onClose,
  handledChildren,
}: CollapsibleProps) {
  const { theme } = useThemeContext();

  const dispatch = useDispatch();

  const toggle = useCallback(
    (title: string) => {
      dispatch(toggleReasoningTitle(title));
    },
    [dispatch],
  );

  const currentTitle = useSelector(
    (state: RootState) => state.reasoning.titleToggled,
  );

  const isCollapsed = useCallback((): boolean => {
    return currentTitle === title;
  }, [currentTitle, title]);

  const { orientation } = useSelector((state: RootState) => state.chat);

  useEffect(() => {
    if (currentTitle === title) {
      if (onOpen) onOpen(children);
    } else {
      if (onClose) onClose();
    }
  }, [currentTitle, isCollapsed, onOpen, onClose, title, children]);

  return (
    <div
      className={`${theme === "light" && "border"} ${className} w-full rounded-lg shadow-sm`}
    >
      {/* Header / Trigger */}
      <Button
        variant="soft"
        onClick={() => toggle(title as string)}
        className="!flex !items-center !justify-between !w-full !p-3 !transition !rounded-full"
        aria-expanded={isCollapsed()}
        aria-controls="collapsible-content"
      >
        <span className="font-semibold ">{title}</span>
        <ChevronDown
          className={`transition-transform ${isCollapsed() ? "rotate-180" : ""}`}
        />
      </Button>

      {/* Collapsible Content with Smooth Animation */}
      <motion.div
        id="collapsible-content"
        initial={false}
        animate={{ height: isCollapsed() ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <ScrollArea
          scrollbars="vertical"
          className={`overflow-auto transition-all duration-300 max-h-[${maxHeight}]`}
        >
          <Flex className="p-4">
            {handledChildren && orientation === "horizontal" ? <></> : children}
          </Flex>
        </ScrollArea>
      </motion.div>
    </div>
  );
}
