import { Flex } from "@radix-ui/themes";
import { Star, StarHalf } from "lucide-react";
import { memo, useCallback } from "react";

const StarRating = memo(({ alignment = 0 }: { alignment?: number }) => {
  const stars = alignment / 2;

  const getAlignmentColor = useCallback(() => {
    if (alignment >= 8) return "text-yellow-500";
    if (alignment >= 5) return "text-amber-500";
    return "text-red-500";
  }, [alignment]);

  const colorClass = getAlignmentColor();

  return (
    <Flex>
      {Array.from({ length: Math.floor(stars) }).map((_, i) => (
        <Star key={`fullStar-${i}`} className={colorClass} />
      ))}
      {stars % 1 >= 0.5 && <StarHalf key="halfStar" className={colorClass} />}
    </Flex>
  );
});

export default StarRating;
