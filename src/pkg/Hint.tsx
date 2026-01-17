import { Flex, Text } from "@radix-ui/themes";
import { InfoIcon } from "lucide-react";
import type { ReactNode } from "react";

const Hint = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Flex gap={"2"} justify={"center"} className={`${className} w-full px-3 py-2 md:px-4 md:py-3 relative m-auto rounded-lg bg-blue-50 dark:bg-blue-950 bg-opacity-50`}>
      <InfoIcon size={"1.25rem"} className="!flex-shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
      <Text size="2" align={"center"} className="text-slate-700 dark:text-slate-300">
        {children}
      </Text>
    </Flex>
  );
};

export default Hint;
