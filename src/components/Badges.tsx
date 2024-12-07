import { Flex } from "@radix-ui/themes";
import Badge from "./Badge";
import { AllowedColors } from "./RadixColors";

export type Badge = {
  /**
   * Text to display on the badge.
   * @type {string}
   * @required
   * @example "Badge"
   */
  badgeLabel: string;
  /**
   * Optional color for the badge.
   * @type {AllowedColors}
   * @example "blue"
   */
  color?: AllowedColors;
};
/**
 * BadgesProps type for the Badges component.
 * @typedef {Object} BadgesProps
 * @property {(Badge[] | string[])} badges - Array of badges to display.
 * @property {"1" | "2" | "3"} [size] - Optional size for the badges.
 * @property {"solid" | "soft" | "surface" | "outline" | "soft"} [variant] - Optional variant for the badges.
 * @property {boolean} [highContrast] - Optional flag to enable high contrast mode.
 * @property {"none" | "small" | "medium" | "large" | "full"} [radius] - Optional radius for the badges.
 */
export type BadgesProps = {
  badges: Badge[] | string[];
  size?: "1" | "2" | "3";
  variant?: "solid" | "soft" | "surface" | "outline" | "soft";
  highContrast?: boolean;
  radius?: "none" | "small" | "medium" | "large" | "full";
};
/**
 *
 * @param props BadgesProps
 * @returns
 */
export default function Badges(props: BadgesProps) {
  return (
    <Flex gap="2">
      {props.badges.map((badge, index) => (
        <Badge
          label={typeof badge === "string" ? badge : badge.badgeLabel}
          key={index}
          variant={props.variant}
          size={props.size ? props.size : "1"}
          highContrast={props.highContrast ? props.highContrast : false}
          radius={props.radius ? props.radius : "none"}
          color={typeof badge === "string" ? "blue" : badge.color}
        />
      ))}
    </Flex>
  );
}
