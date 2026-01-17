import { Flex } from "@radix-ui/themes";
import { forwardRef } from "react";
import useCustomBG from "../../page/hooks/useCustomBG";

interface WrapProps {
  className?: string;
  children?: React.ReactNode;
}

const Wrap = forwardRef<HTMLDivElement, WrapProps>(({ className = "", children }, ref) => {
  const { customBG } = useCustomBG();
  return (
    <Flex
      ref={ref}
      className={`${customBG} ${className} !flex w-[100%] md:!min-w-[70%] !h-[100vh] !overflow-auto`}
    >
      {children}
    </Flex>
  );
});

export default Wrap;
