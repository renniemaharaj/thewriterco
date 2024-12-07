import { Flex } from "@radix-ui/themes";
import Card from "./Card";

/**
 * Card type for the Cards component.
 * @typedef {Object} Card
 * @property {string} primaryText - Primary text for the card.
 * @property {string} secondaryText - Secondary text for the card.
 * @property {string} [src] - Optional image source for the card.
 * @property {string} [href] - Optional link for the card.
 * @property {string} fallback - Fallback text for the card.
 */
type _Card = {
  primaryText: string;
  secondaryText: string;
  src?: string;
  href?: string;
  fallback: string;
};
/**
 * CardsProps type for the Cards component.
 * @typedef {Object} CardsProps
 * @property {Card[]} Cards - Array of cards to display.
 * @property {boolean} [asChild] - Optional flag to render as a child.
 * @property {"surface" | "classic" | "ghost"} [variant] - Optional variant for the cards.
 * @property {"1" | "2" | "3"} [size] - Optional size for the cards.
 * @property {"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"} [gap] - Optional gap between the cards.
 */
type CardsProps = {
  Cards: _Card[];
  asChild?: boolean;
  variant?: "surface" | "classic" | "ghost";
  size?: "1" | "2" | "3";
  gap?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
};
/**
 *
 * @param props CardsProps
 * @returns The rendered Cards component.
 */
export default function Cards({
  Cards,
  asChild,
  variant,
  size,
  gap,
}: CardsProps) {
  return (
    <Flex gap={gap || "2"}>
      {Cards.map((card, index) => (
        <Card
          primaryText={card.primaryText}
          secondaryText={card.secondaryText}
          src={card.src}
          fallback={card.fallback}
          key={index}
          asChild={asChild}
          variant={variant}
          size={size}
          href={card.href || undefined}
        />
      ))}
    </Flex>
  );
}
