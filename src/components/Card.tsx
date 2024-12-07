import { Avatar, Box, Card as _Card, Flex, Text } from "@radix-ui/themes";
/**
 * CardProps type for the Card component.
 * @typedef {Object} CardProps
 * @property {boolean} [asChild] - Optional flag to render as a child.
 * @property {"surface" | "classic" | "ghost"} [variant] - Optional variant for the card.
 * @property {"1" | "2" | "3"} [size] - Optional size for the card.
 * @property {string} primaryText - Primary text for the card.
 * @property {string} secondaryText - Secondary text for the card.
 * @property {string} [src] - Optional image source for the card.
 * @property {string} [href] - Optional link for the card.
 * @property {string} fallback - Fallback text for the card.
 */
type CardProps = {
  asChild?: boolean;
  variant?: "surface" | "classic" | "ghost";
  size?: "1" | "2" | "3";
  primaryText: string;
  secondaryText: string;
  src?: string;
  href?: string;
  fallback: string;
};
/**
 *
 * @param props CardProps
 * @returns The rendered Card component.
 */
export default function Card({
  asChild,
  variant,
  size,
  primaryText,
  secondaryText,
  src,
  href,
  fallback,
}: CardProps) {
  return (
    <Box maxWidth="240px">
      <_Card
        asChild={asChild || false}
        variant={variant || "classic"}
        size={size || "1"}
      >
        <Flex gap="3" align="center">
          {src && (
            <Avatar size="3" src={src} radius="full" fallback={fallback} />
          )}
          <Box>
            {href ? (
              <a href={href}>
                <Text as="div" size="2" weight="bold">
                  {primaryText}
                </Text>
                <Text as="div" size="2" color="gray">
                  {secondaryText}
                </Text>
              </a>
            ) : (
              <>
                <Box>
                  <Text as="div" size="2" weight="bold">
                    {primaryText}
                  </Text>
                  <Text as="div" size="2" color="gray">
                    {secondaryText}
                  </Text>
                </Box>
              </>
            )}
          </Box>
        </Flex>
      </_Card>
    </Box>
  );
}
