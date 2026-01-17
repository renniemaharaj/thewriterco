import { Tabs } from "@radix-ui/themes";
import type { ReactNode } from "react";

const Content = ({
  children,
  key,
  value,
}: {
  children: ReactNode;
  key: string;
  value: string;
}) => {
  return (
    <Tabs.Content key={key} value={value} className="!flex !flex-row !flex-wrap !justify-center">
      {children}
    </Tabs.Content>
  );
};

export default Content;
