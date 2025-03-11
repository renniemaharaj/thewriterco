import { Heading } from "@radix-ui/themes";
import React from "react";

export type HeaderProps = {
  content: string;
};
const Header: React.FC<HeaderProps> = ({ content }) => {
  return <Heading size="4">{content}</Heading>;
};

export default Header;
