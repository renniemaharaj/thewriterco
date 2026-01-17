import { Flex } from "@radix-ui/themes";
import * as React from "react";
import type { ReactNode } from "react";
import Hint from "../pkg/Hint";

export type HeroProps = {
  header: ReactNode;
  subHeader: ReactNode;
  hint?: ReactNode;
  className?: string;
};

const Hero: React.FC<HeroProps> = (props: HeroProps) => {
  const { header, subHeader, hint, className = "!text-center !justify-center !items-center" } = props;
  return (
    <Flex className={`flex-col gap-4 md:gap-6 ${className}`}>
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          {header}
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold">
          {subHeader}
        </h2>
      </div>
      {hint && <Hint className="max-w-md md:max-w-lg overflow-hidden mt-2 mb-3 md:mb-4">{hint}</Hint>}
    </Flex>
  );
};

export default Hero;
