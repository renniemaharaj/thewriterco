import { useParams } from "react-router-dom";
import { useTransitionNavigation } from "../../hooks/useTransitionNavigation";
import { CollapsibleItem } from "./Menu";
import { Card } from "@radix-ui/themes";

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
    <div
      className={`holographic-container cursor-pointer overflow-hidden !transition-all !duration-300 p-2`}
      onClick={() => {
        if (!isSelected) {
          navigateWT(`/read/${urlTab}/${itemTitle}`);
        }
      }}
    >
      <div className="holographic-card !transition-all !duration-300">
        <Card>
          <h4 title={itemTitle}>
            {itemTitle.length > 32 ? itemTitle.slice(0, 32) + "…" : itemTitle}
          </h4>
        </Card>
      </div>
    </div>
  );
};

export default Item;
