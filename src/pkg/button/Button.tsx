import { Flex, Button as RButton } from "@radix-ui/themes";
import { ReactNode } from "react";
import { AllowedColors } from "../RadixColors";

type Variants =
  | "ghost"
  | "surface"
  | "classic"
  | "solid"
  | "soft"
  | "outline"
  | undefined;
const Button = ({
  color,
  variant = "soft",
  onClick,
  children,
  disabled,
  className,
  noHolographic = false,
}: {
  color?: AllowedColors;
  variant?: Variants;
  onClick?: (e: React.MouseEvent) => void;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  noHolographic?: boolean;
}) => {
  return (
    <Flex
      className={`${!noHolographic && "holographic-container"} rounded-full !transition-all !duration-300 !p-0 m-0`}
    >
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
        >
          {children}
        </RButton>
      </Flex>
    </Flex>
  );
};

export default Button;
