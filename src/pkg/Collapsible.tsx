import React, { ReactNode, useCallback, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button, Flex, ScrollArea, Separator, Link } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { useThemeContext } from "./context/theme/useThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setCurrentTitle } from "../app/reasoning/reasoningSlice";

type CollapsibleProps = {
  title: ReactNode;
  renderedTitle?: ReactNode;
  children: React.ReactNode;
  maxHeight?: string;
  className?: string;
  onOpen?: (content: ReactNode) => void;
  onClose?: () => void;
  collapsibleRef?: React.Ref<HTMLDivElement>;
  handledChildren?: boolean;
};

const isSlashCommand = (title: ReactNode): boolean => {
  return typeof title === "string" && title.trim().startsWith("/");
};

const renderSlashCommand = (command: string, content: ReactNode) => {
  switch (command) {
    case "/separate":
      return <Separator size="3" className="my-3 mx-auto" />;
    case "/source":
      return (
        <div className="text-sm text-center text-muted-foreground my-4">
          <Link href={content as string}>Source</Link>
        </div>
      );
    default:
      return null;
  }
};

const Collapsible = ({
  title,
  renderedTitle,
  children,
  maxHeight = "200px",
  className,
  onOpen,
  onClose,
  collapsibleRef,
  handledChildren,
}: CollapsibleProps) => {
  const currentTitle = useSelector(
    (state: RootState) => state.reasoning.currentTitle,
  );

  const { theme } = useThemeContext();
  const dispatch = useDispatch();

  const isCollapsed = useCallback((): boolean => {
    return currentTitle === title;
  }, [currentTitle, title]);

  const { orientation } = useSelector((state: RootState) => state.chat);

  const handleBtnClick = useCallback(() => {
    if (currentTitle === title) {
      dispatch(setCurrentTitle(""));

      if (onOpen) onOpen("");
    } else {
      dispatch(setCurrentTitle(title as string));
    }
  }, [dispatch, currentTitle, title, onOpen]);

  useEffect(() => {
    if (currentTitle === title) {
      if (onOpen) onOpen(children);
    } else {
      if (onClose) onClose();
    }
  }, [currentTitle, isCollapsed, onClose, onOpen, title, children]);

  // ---------- Early return for slash command ----------
  if (isSlashCommand(title)) {
    return renderSlashCommand((title as string).toLowerCase().trim(), children);
  }
  return (
    <div
      ref={collapsibleRef}
      className={`${theme === "light" && "border"} ${className} w-full rounded-lg shadow-sm`}
    >
      {/* Header / Trigger */}
      <Button
        variant="soft"
        onClick={handleBtnClick}
        className="!flex !items-center !justify-between !w-full !p-3 !transition !rounded-full"
        aria-expanded={isCollapsed()}
        aria-controls="collapsible-content"
      >
        <span className="font-semibold">{renderedTitle ?? title}</span>
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
          scrollbars="both"
          className={`overflow-auto transition-all duration-300 max-h-[${maxHeight}]`}
        >
          <Flex className="p-4">
            {handledChildren && orientation === "horizontal" ? <></> : children}
          </Flex>
        </ScrollArea>
      </motion.div>
    </div>
  );
};

export default Collapsible;
