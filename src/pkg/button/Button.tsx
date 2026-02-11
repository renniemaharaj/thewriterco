import { Flex, Button as RButton } from "@radix-ui/themes";
import type * as React from "react";
import type { ReactNode } from "react";
import type { AllowedColors } from "../RadixColors";

type Variants = "ghost" | "surface" | "classic" | "solid" | "soft" | "outline" | undefined;
const Button = ({
  color,
  variant = "soft",
  children,
  disabled,
  className,
  noHolographic = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  color?: AllowedColors;
  variant?: Variants;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  noHolographic?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
}) => {
  return (
    <Flex className={`${!noHolographic && "holographic-container"} rounded-full !p-0 m-0`}>
      <Flex
        className={`${!noHolographic && "holographic-card"} rounded-full !transition-all !duration-300 !p-0 m-0`}
      >
        <RButton
          color={color}
          variant={variant}
          highContrast={noHolographic}
          className={className}
          disabled={disabled}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {children}
        </RButton>
      </Flex>
    </Flex>
  );
};

export default Button;
