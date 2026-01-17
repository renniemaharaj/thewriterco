import { Separator as RadixSeparator } from "@radix-ui/themes";
import type { ComponentPropsWithoutRef } from "react";

interface SeparatorProps extends ComponentPropsWithoutRef<typeof RadixSeparator> {
  /** Visual size/thickness of the separator */
  size?: "1" | "2" | "3" | "4";
  /** Direction of the separator */
  orientation?: "horizontal" | "vertical";
  /** CSS class for custom styling */
  className?: string;
}

/**
 * Separator Component
 * A reusable wrapper around Radix UI Separator with preset configurations
 * for common use cases (navigation dividers, section breaks, etc.)
 *
 * @example
 * ```tsx
 * <Separator />  // Horizontal separator
 * <Separator orientation="vertical" className="h-5" />  // Vertical separator in header
 * <Separator size="2" className="my-4" />  // Larger separator with spacing
 * ```
 */
const Separator = ({ size = "1", orientation = "horizontal", className, ...props }: SeparatorProps) => {
  return (
    <RadixSeparator
      size={size}
      orientation={orientation}
      className={className}
      {...props}
    />
  );
};

export default Separator;
