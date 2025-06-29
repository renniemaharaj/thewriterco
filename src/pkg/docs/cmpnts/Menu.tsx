import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Tabs, Box } from "@radix-ui/themes";

import Item from "./Item";
import { Carousel } from "../../Carousel";
import Trigger from "./Trigger";
import { useParams } from "react-router-dom";
import { useTransitionNavigation } from "../../hooks/useTransitionNavigation";
import useDefaultTabs from "../../hooks/useDefaultTabs";
import { min } from "lodash";

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

  const [maxItems, setMaxItems] = useState(3);

  const { navigateWT } = useTransitionNavigation();

  const defaultTabs = useDefaultTabs();

  const combinedTabs = useMemo(
    () => [...defaultTabs, ...additionalTabs],
    [defaultTabs, additionalTabs],
  );

  const currentTab =
    combinedTabs.find((tab) => tab.value === urlTab) || combinedTabs[0];
  const visibleCount = min([currentTab.content.length, maxItems]) || 0;

  const pagination = useMemo(() => {
    if (visibleCount >= currentTab.content.length) return null;

    return (
      <Box>
        <div className="col-span-full flex flex-row justify-center mt-4 text-sm gap-2">
          <span>
            Showing {visibleCount} of {currentTab.content.length} items
          </span>
          <button
            onClick={() => setMaxItems((prev) => prev + 3)}
            className="text-blue-600 font-medium hover:underline"
          >
            Show More
          </button>
        </div>
      </Box>
    );
  }, [currentTab, visibleCount]);

  const renderedTabContents = useMemo(() => {
    return combinedTabs.map((tab) => {
      const isCurrent = tab.value === currentTab.value;
      const itemsToRender = isCurrent
        ? tab.content.slice(0, maxItems)
        : tab.content;

      const renderedItems = itemsToRender.map((item, index) => (
        <motion.div
          key={index + "tabsItem"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.2 }}
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
  }, [combinedTabs, currentTab.value, maxItems]);

  return (
    <Tabs.Root
      onValueChange={(v) => {
        navigateWT(`/read/${v}`);
      }}
      value={urlTab || combinedTabs[0].value}
      defaultValue={urlTab || combinedTabs[0].value}
      className={className}
    >
      <Tabs.List className="!w-full p-2">
        <Carousel
          variant="no-scrollbar"
          items={combinedTabs.map((tab) => (
            <Trigger key={tab.value} tab={tab} currentTab={urlTab || ""} />
          ))}
        />
      </Tabs.List>

      <Box pt="3" className="max-w-[100%] !min-h-full">
        {renderedTabContents}
      </Box>

      {pagination}
    </Tabs.Root>
  );
};

export default Menu;
