import { Button, Flex, ScrollArea } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React, { type ReactNode, useEffect } from "react";
import { useThemeContext } from "./context/theme/useThemeContext";

type CollapsibleProps = {
  title: ReactNode;
  renderedTitle?: ReactNode;
  children: React.ReactNode;
  maxHeight?: string;
  className?: string;
  onOpen?: (content: ReactNode) => void;
  onClose?: () => void;
  collapsibleRef?: React.Ref<HTMLDivElement>;
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
}: CollapsibleProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const { theme } = useThemeContext();

  useEffect(() => {
    if (!isCollapsed && onClose) {
      onClose();
    } else if (isCollapsed && onOpen) {
      onOpen(children);
    }
  }, [isCollapsed, onOpen, onClose, children]);

  return (
    <div
      ref={collapsibleRef}
      className={`${theme === "light" && "border"} ${className} w-full rounded-lg shadow-sm`}
    >
      {/* Header / Trigger */}
      <Button
        variant="soft"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="!flex !items-center !justify-between !w-full !p-3 !transition !rounded-full"
        aria-expanded={isCollapsed}
        aria-controls="collapsible-content"
      >
        <span className="font-semibold">{renderedTitle ?? title}</span>
        <ChevronDown className={`transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
      </Button>

      {/* Collapsible Content with Smooth Animation */}
      <motion.div
        id="collapsible-content"
        initial={false}
        animate={{ height: isCollapsed ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <ScrollArea
          scrollbars="both"
          className={`overflow-auto transition-all duration-300 max-h-[${maxHeight}]`}
        >
          <Flex className={`!py-4 `}>{children}</Flex>
        </ScrollArea>
      </motion.div>
    </div>
  );
};

export default Collapsible;
