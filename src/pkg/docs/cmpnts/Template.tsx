import { Flex } from "@radix-ui/themes";
import React from "react";

type TemplateProps = {
  children: React.ReactNode;
};

const Template: React.FC<TemplateProps> = ({ children }) => {
  return <Flex className="!flex-col merriweather-bold gap-4">{children}</Flex>;
};

export default Template;
