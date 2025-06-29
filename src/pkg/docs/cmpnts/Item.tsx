import { useParams } from "react-router-dom";
import { useTransitionNavigation } from "../../hooks/useTransitionNavigation";
import { CollapsibleItem } from "./Menu";
import { Card, Flex, Text } from "@radix-ui/themes";
import "./item.css";

const Item = ({
  urlTab,
  title: itemTitle,
}: CollapsibleItem & {
  urlTab: string;
}) => {
  const { title } = useParams<{ title: string }>();
  const { navigateWT } = useTransitionNavigation();
  const isSelected = title === itemTitle;

  return (
    <Card
      asChild
      variant={isSelected ? "surface" : "classic"}
      className={`holographic-container cursor-pointer overflow-hidden transition-all duration-300`}
      onClick={() => {
        if (!isSelected) {
          navigateWT(`/read/${urlTab}/${itemTitle}`);
        }
      }}
    >
      <Flex
        direction="column"
        gap="1"
        p="3"
        className="holographic-card relative z-10"
      >
        <Text weight="bold" title={itemTitle}>
          {itemTitle.length > 32 ? itemTitle.slice(0, 32) + "…" : itemTitle}
        </Text>
      </Flex>
    </Card>
  );
};

export default Item;
