import { ReactNode } from "react";
import { Text as RText } from "@radix-ui/themes";

type TextProps = {
  children: ReactNode;
};
const Text = ({ children }: TextProps) => {
  return <RText>{children}</RText>;
};

export default Text;
