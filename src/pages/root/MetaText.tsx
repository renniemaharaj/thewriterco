import { Text } from "@radix-ui/themes";
import { FC, ReactNode } from "react";

const MetaText: FC<{
  children: ReactNode;
  className?: string;
  reveal: boolean;
  asLink?: boolean;
  href?: string;
}> = ({ children, className, reveal }) => {
  const baseClass = `text-sm transition duration-300 ${
    reveal ? "blur-none text-foreground" : "blur-sm text-muted"
  }`;

  return (
    <Text as="div" className={`${baseClass} ${className}`}>
      {children}
    </Text>
  );
};

export default MetaText;
