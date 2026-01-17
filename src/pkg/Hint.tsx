import { Flex, Text } from "@radix-ui/themes";
import { InfoIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useThemeContext } from "./context/theme/useThemeContext";

const Hint = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { theme } = useThemeContext();
  
  const bgColor = theme === "dark" ? "bg-blue-950" : "bg-blue-100";
  const iconColor = theme === "dark" ? "text-blue-400" : "text-blue-700";
  
  return (
    <Flex gap={"2"} justify={"center"} className={`${className} w-full px-3 py-2 md:px-4 md:py-3 relative m-auto rounded-lg ${bgColor} bg-opacity-70`}>
      <InfoIcon size={"1.25rem"} className={`!flex-shrink-0 ${iconColor} mt-0.5`} />
      <Text size="2" align={"center"} className="">
        {children}
      </Text>
    </Flex>
  );
};

export default Hint;
