import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Tabs, Box, ScrollArea } from "@radix-ui/themes";

import Collapsible from "../../Collapsible";
import { reasoningForAxioms } from "../reasoningForAxioms";
import { axiomsContent } from "../axioms";
import { ftevidence } from "../ftevidence";
import { kjvArguments } from "../kjArguments";
import { introduction } from "../intro";
import {
  fteSourceCommand,
  kjvSourceCommand,
  seperatorCommand,
} from "../commands";

// Define the shape of each collapsible item
type CollapsibleItem = {
  title: string;
  body: ReactNode;
};

// Tab type definition
export type TabItem = {
  label: string;
  value: string;
  content: CollapsibleItem[]; // array of collapsible sections
};

type MenuProps = {
  className?: string;
  routeChildren?: (content: ReactNode) => void;
  additionalTabs?: TabItem[];
};

const Menu = ({ className, routeChildren, additionalTabs = [] }: MenuProps) => {
  const scrollAreaClass =
    "!flex !mx-auto p-2 flex-col h-full max-h-[100vh] !sticky !top-0";

  const tabListClass = "!flex !flex-wrap space-x-4 !shadow-none pb-2";

  // Example default tabs with structured title + body
  const defaultTabs: TabItem[] = [
    {
      label: "Axioms",
      value: "axioms",
      content: axiomsContent,
    },
    {
      label: "Verbose",
      value: "reasoning",
      content: [
        ...introduction,
        seperatorCommand,
        ...reasoningForAxioms,
        seperatorCommand,
        ...ftevidence,
        fteSourceCommand,
        ...kjvArguments,
        kjvSourceCommand,
      ],
    },
  ];

  const combinedTabs = [...defaultTabs, ...additionalTabs];

  return (
    <ScrollArea className={`${className} ${scrollAreaClass}`}>
      <Tabs.Root
        defaultValue={combinedTabs[0]?.value}
        className="!max-w-[100%]"
      >
        <Tabs.List className={tabListClass}>
          {combinedTabs.map((tab) => (
            <Tabs.Trigger
              key={tab.value + "tabsTrigger"}
              value={tab.value}
              className="px-4 py-2"
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Box pt="3" className="space-y-4 max-w-[100%]">
          {combinedTabs.map((tab) => (
            <Tabs.Content
              key={tab.value + "tabsContent"}
              value={tab.value}
              className="!flex flex-col !gap-2"
            >
              {tab.content.map((item, index) => (
                <motion.div
                  key={index + "tabsItem"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Collapsible
                    title={item.title}
                    handledChildren={!!routeChildren}
                    onOpen={() => routeChildren?.(item.body)}
                  >
                    {item.body}
                  </Collapsible>
                </motion.div>
              ))}
            </Tabs.Content>
          ))}
        </Box>
      </Tabs.Root>
    </ScrollArea>
  );
};

export default Menu;
