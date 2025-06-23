import { useEffect, useRef } from "react";
import { Tabs } from "@radix-ui/themes";
import Tab from "./Tab";
import { TabItem } from "./Menu";

const Trigger = ({ tab, currentTab }: { tab: TabItem; currentTab: string }) => {
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
      className="px-4 py-2"
    >
      <Tab title={tab.label} />
    </Tabs.Trigger>
  );
};

export default Trigger;
