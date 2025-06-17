import { ReactNode, useCallback, useMemo } from "react";
import Collapsible from "../../Collapsible";
import { CollapsibleItem } from "./Menu";
import { useGitFetchDocument } from "../../hooks/data/gitFetchDocument";
import { Flex } from "@radix-ui/themes";
import { Spinner } from "@radix-ui/themes";
import { Card, Text, Button } from "@radix-ui/themes";
import Renderer from "../../writer/Renderer";

const Item = ({
  title,
  body,
  fetchPath,
  filename,
  routeChildren,
}: CollapsibleItem & { routeChildren?: (content: ReactNode) => void }) => {
  const { content, loading, error, refetch } = useGitFetchDocument({
    fetchPath: fetchPath || "",
    filename: filename || "index",
  });

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
      title={title}
      handledChildren={!!routeChildren}
      onOpen={() => routeChildren?.(memoizedContent)}
    >
      {memoizedContent}
    </Collapsible>
  );
};

export default Item;
