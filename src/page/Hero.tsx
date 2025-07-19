import React, { ReactNode } from "react";
import { Flex } from "@radix-ui/themes";
import Hint from "../pkg/Hint";

export type HeroProps = {
  header: ReactNode;
  subHeader: ReactNode;
  hint?: ReactNode;
  className?: string;
};
const Hero: React.FC<HeroProps> = ({
  header,
  subHeader,
  hint,
  className = "!text-center !justify-center !items-center",
}) => {
  return (
    <Flex className={`flex-col gap-4 ${className}`}>
      <h2 className="text-2xl font-bold">
        {header} <span className="w-full text-center">{subHeader}</span>
      </h2>
      {hint && <Hint className="max-w-[400px] overflow-hidden">{hint}</Hint>}
    </Flex>
  );
};

export default Hero;
