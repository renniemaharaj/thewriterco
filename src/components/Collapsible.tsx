import { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button, Flex, ScrollArea } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { useThemeContext } from "./context/useThemeContext";

type CollapsibleProps = {
  title: ReactNode;
  children: React.ReactNode;
  maxHeight?: string;
  className?: string;
};

export default function Collapsible({
  title,
  children,
  maxHeight = "200px",
  className,
}: CollapsibleProps) {
  const [open, setOpen] = useState(false);
  const { theme } = useThemeContext();
  return (
    <div
      className={`${theme === "light" && "border"} ${className} w-full rounded-lg shadow-sm`}
    >
      {/* Header / Trigger */}
      <Button
        variant="soft"
        onClick={() => setOpen(!open)}
        className="!flex !items-center !justify-between !w-full !p-3 !transition !rounded-t-lg"
        aria-expanded={open}
        aria-controls="collapsible-content"
      >
        <span className="font-semibold">{title}</span>
        <ChevronDown
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </Button>

      {/* Collapsible Content with Smooth Animation */}
      <motion.div
        id="collapsible-content"
        initial={false}
        animate={{ height: open ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <ScrollArea
          scrollbars="vertical"
          className={`overflow-auto transition-all duration-300 max-h-[${maxHeight}]`}
        >
          <Flex className="p-4">{children}</Flex>
        </ScrollArea>
      </motion.div>
    </div>
  );
}
