import { Tabs } from "@radix-ui/themes";
import { useEffect, useRef } from "react";
import Button from "../../button/Button";
import type { TabItem } from "./Menu";

const Trigger = ({
  tab,
  currentTab,
  defaultTab,
}: {
  tab: TabItem;
  currentTab: string;
  defaultTab: string;
}) => {
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (currentTab === tab.value && triggerRef.current) {
      triggerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [currentTab, tab.value]);

  return (
    <Tabs.Trigger
      ref={triggerRef}
      key={tab.value + "tabsTrigger"}
      value={tab.value}
      className="!p-0"
    >
      <Button noHolographic={tab.value === currentTab || (!currentTab && tab.value === defaultTab)}>
        {tab.label}
      </Button>
    </Tabs.Trigger>
  );
};

export default Trigger;
