import { Flex, Text } from "@radix-ui/themes";
import { InfoIcon } from "lucide-react";
import { ReactNode } from "react";

const Hint = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Flex
      gap={"1"}
      justify={"center"}
      className={`${className} w-full p-2 relative m-auto`}
    >
      <InfoIcon size={"1.1rem"} color="blue" className="!flex-shrink-0" />
      <Text size="1" align={"center"}>
        {children}
      </Text>
    </Flex>
  );
};

export default Hint;
