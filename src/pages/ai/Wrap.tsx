import { Flex } from "@radix-ui/themes";
import { forwardRef } from "react";
import { useThemeContext } from "../../pkg/context/theme/useThemeContext";

interface WrapProps {
  className?: string;
  children?: React.ReactNode;
}

const Wrap = forwardRef<HTMLDivElement, WrapProps>(
  ({ className = "", children }, ref) => {
    const { theme } = useThemeContext();
    return (
      <Flex
        ref={ref}
        className={`${className} ${theme === "dark" ? "bg-[#171918]" : "border"} !flex w-[100%] md:!min-w-[70%] !h-[100vh] !overflow-auto`}
      >
        {children}
      </Flex>
    );
  },
);

export default Wrap;
