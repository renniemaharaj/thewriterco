import { Flex } from "@radix-ui/themes";
import React from "react";

type GuideProps = {
  children: React.ReactNode;
};

const GuideTemplate: React.FC<GuideProps> = ({ children }) => {
  return <Flex className="!flex-col merriweather-bold gap-4">{children}</Flex>;
};

export default GuideTemplate;
