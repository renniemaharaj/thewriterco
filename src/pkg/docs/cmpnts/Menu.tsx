import { useEffect, useMemo, useState } from "react";
import { Tabs, Box } from "@radix-ui/themes";

import Item from "./Item";
import { Carousel } from "../../Carousel";
import Trigger from "./Trigger";
import { useParams } from "react-router-dom";
import { useTransitionNavigation } from "../../hooks/useTransitionNavigation";
import useDefaultTabs from "../../hooks/useDefaultTabs";
import { min } from "lodash";
import Content from "./Content";
import Motion from "../../../page/Motion";

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

  const [delayListing, setDelayListing] = useState(true);

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
        <Motion className="w-full md:!w-[21rem]" index={index}>
          <Item urlTab={tab.value} title={item.title} />
        </Motion>
      ));

      return (
        <Content key={tab.value + "tabsContent"} value={tab.value}>
          {renderedItems}
        </Content>
      );
    });
  }, [combinedTabs, currentTab.value, maxItems]);

  useEffect(() => {
    setTimeout(() => setDelayListing(false), 1000);
  }, []);
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
          className="py-2"
          items={combinedTabs.map((tab) => (
            // <Motion index={index} cap={false}>
            <Trigger
              key={tab.value}
              tab={tab}
              currentTab={urlTab || ""}
              defaultTab={combinedTabs[0].value}
            />
            // </Motion>
          ))}
        />
      </Tabs.List>

      <Box pt="3" className="!min-w-full !min-h-full !pt-4">
        {!renderedTabContents.length || delayListing ? (
          <Content key="skeleton-content" value={currentTab.value}>
            {Array.from({ length: 3 }).map((_i, index) => (
              <Motion
                className="w-full md:!w-[21rem]"
                index={index}
                key={index}
              >
                <Item urlTab="" title="" />
              </Motion>
            ))}
          </Content>
        ) : (
          renderedTabContents
        )}
      </Box>

      {pagination}
    </Tabs.Root>
  );
};

export default Menu;
