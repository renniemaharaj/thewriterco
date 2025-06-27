import { ReactNode, useCallback, useMemo } from "react";
import Collapsible from "../../Collapsible";
import { CollapsibleItem } from "./Menu";
import { useGitFetchDocument } from "../../hooks/data/gitFetchDocument";
import { Flex } from "@radix-ui/themes";
import { Spinner } from "@radix-ui/themes";
import { Card, Text, Button } from "@radix-ui/themes";
import Renderer from "../../writer/Renderer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useTransitionNavigation } from "../../hooks/useTransitionNavigation";
import { useParams } from "react-router-dom";
import { setCurrentTitle } from "../../../app/reasoning/reasoningSlice";

const Item = ({
  title: itemTitle,
  body,
  fetchPath,
  filename,
  routeChildren,
}: CollapsibleItem & { routeChildren?: (content: ReactNode) => void }) => {
  const { content, loading, error, refetch } = useGitFetchDocument({
    fetchPath: fetchPath || "",
    filename: filename || "index",
  });
  const dispatch = useDispatch();
  const doc = useSelector((state: RootState) => state.reasoning);
  const currentTab = doc.currentTab;

  const { title } = useParams<{ title: string }>();
  const { navigateWT } = useTransitionNavigation();

  const renderContent = useCallback(() => {
    if (loading) {
      return (
        <Flex align="center" justify="center" py="4">
          <Spinner />
        </Flex>
      );
    }

    if (error) {
      return (
        <Card variant="surface">
          <Flex direction="column" gap="2" align="center" py="4">
            <Text color="red" size="2">
              Error loading content
            </Text>
            <Button variant="soft" onClick={() => refetch()}>
              Retry
            </Button>
          </Flex>
        </Card>
      );
    } else {
      if (content) {
        return <Renderer content={content} />;
      }
      return body;
    }
  }, [loading, content, body, error, refetch]);

  const memoizedContent = useMemo(() => renderContent(), [renderContent]);

  return (
    <Collapsible
      title={itemTitle}
      handledChildren={!!routeChildren}
      onOpen={() => {
        if (title !== itemTitle) {
          // Update the current tab
          dispatch(setCurrentTitle(itemTitle));
          navigateWT(`/reasoning/${currentTab}/${itemTitle}`);
          return;
        }
        routeChildren?.(memoizedContent);
      }}
    >
      {memoizedContent}
    </Collapsible>
  );
};

export default Item;
