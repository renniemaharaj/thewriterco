import { ReactNode } from "react";
import Collapsible from "../../Collapsible";
import { CollapsibleItem } from "./Menu";
import { useTransitionNavigation } from "../../hooks/useTransitionNavigation";
import { useParams } from "react-router-dom";

const Item = ({
  urlTab,
  title: itemTitle,
}: CollapsibleItem & {
  urlTab: string;
  routeChildren?: (content: ReactNode) => void;
}) => {
  const { title } = useParams<{ title: string }>();
  const { navigateWT } = useTransitionNavigation();

  return (
    <Collapsible
      title={itemTitle}
      children={<></>}
      onOpen={() => {
        if (title !== itemTitle) {
          // Update the current tab
          navigateWT(`/read/${urlTab}/${itemTitle}`);
          return;
        }
      }}
    />
  );
};

export default Item;
