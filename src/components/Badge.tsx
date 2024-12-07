import {
  BadgeProps as _BadgeProps,
  Flex,
  Badge as _Badge,
} from "@radix-ui/themes";

interface BadgeProps extends _BadgeProps {
  /**
   * The label to display on the badge.
   * @type {string}
   * @required
   * @example "Badge"
   */
  label: string;
}
export default function Badge(props: BadgeProps) {
  return (
    <Flex gap="2">
      <_Badge {...props}>{props.label}</_Badge>
    </Flex>
  );
}
