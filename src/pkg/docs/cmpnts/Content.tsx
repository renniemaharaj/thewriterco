import { Tabs } from "@radix-ui/themes";
import { ReactNode } from "react";

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
    <Tabs.Content
      key={key}
      value={value}
      className="!flex !flex-row !flex-wrap"
    >
      {children}
    </Tabs.Content>
  );
};

export default Content;
