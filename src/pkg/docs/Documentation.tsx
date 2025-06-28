import { Box, Button, Card, Flex, Spinner, Text } from "@radix-ui/themes";

import Menu, { TabItem } from "./cmpnts/Menu";
import { useParams } from "react-router-dom";
import { useGitFetchDocument } from "../hooks/data/gitFetchDocument";
import { useCallback, useMemo } from "react";
import Renderer from "../writer/Renderer";

export type DocumentationProps = {
  additionalTabs?: TabItem[];
};

const Documentation = ({ additionalTabs }: DocumentationProps) => {
  const { tab: urlTab, title: urlTitle } = useParams<{
    tab: string;
    title: string;
  }>();

  const { content, loading, error, refetch } = useGitFetchDocument({
    fetchPath: urlTab,
    filename: urlTitle,
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
    }
  }, [loading, content, error, refetch]);

  const memoizedContent = useMemo(() => renderContent(), [renderContent]);

  const innerBoxClass = `!p-0 !mx-auto !w-full`;

  return (
    <Flex className="gap-2 !overflow-visible w-full !justify-center">
      {urlTab && urlTitle ? (
        <Box className={innerBoxClass}>{memoizedContent}</Box>
      ) : (
        <Card className="w-fit !p-1 !h-fit !sticky !top-[3.2rem]">
          <Menu additionalTabs={additionalTabs} />
        </Card>
      )}
    </Flex>
  );
};

export default Documentation;
