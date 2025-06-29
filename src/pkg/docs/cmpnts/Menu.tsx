import { useMemo } from "react";
import { motion } from "framer-motion";
import { Tabs, Box } from "@radix-ui/themes";

import Item from "./Item";
import { Carousel } from "../../Carousel";
import Trigger from "./Trigger";
import { useParams } from "react-router-dom";
import { useTransitionNavigation } from "../../hooks/useTransitionNavigation";
import useDefaultTabs from "../../hooks/useDefaultTabs";

// Define the shape of each collapsible item
export type CollapsibleItem = {
  title: string;
};

// Tab type definition
export type TabItem = {
  label: string;
  value: string;
  content: CollapsibleItem[]; // array of collapsible sections
};

type MenuProps = {
  className?: string;
  additionalTabs?: TabItem[];
};

const Menu = ({ additionalTabs = [], className }: MenuProps) => {
  const { tab: urlTab } = useParams<{
    tab: string;
  }>();

  const { navigateWT } = useTransitionNavigation();

  const defaultTabs = useDefaultTabs();

  const combinedTabs = useMemo(
    () => [...defaultTabs, ...additionalTabs],
    [defaultTabs, additionalTabs],
  );

  const renderedTabContents = useMemo(() => {
    return combinedTabs.map((tab) => {
      const renderedItems = tab.content.map((item, index) => (
        <motion.div
          key={index + "tabsItem"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Item urlTab={tab.value} title={item.title} />
        </motion.div>
      ));

      return (
        <Tabs.Content
          key={tab.value + "tabsContent"}
          value={tab.value}
          className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3"
        >
          {renderedItems}
        </Tabs.Content>
      );
    });
  }, [combinedTabs]);

  return (
    <Tabs.Root
      onValueChange={(v) => {
        navigateWT(`/read/${v}`);
      }}
      value={urlTab || combinedTabs[0].value}
      defaultValue={urlTab || combinedTabs[0].value}
      className={className}
    >
      <Tabs.List className="!w-full">
        <Carousel
          variant="no-scrollbar"
          className="!w-full"
          items={combinedTabs.map((tab) => (
            <Trigger key={tab.value} tab={tab} currentTab={urlTab || ""} />
          ))}
        />
      </Tabs.List>

      <Box pt="3" className="max-w-[100%]">
        {renderedTabContents}
      </Box>
    </Tabs.Root>
  );
};

export default Menu;
