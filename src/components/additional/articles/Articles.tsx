import React, { useState } from "react";
import { Card, Flex, Text, Heading, Skeleton, Section } from "@radix-ui/themes";
import Hint from "../../Hint";

type Article = {
  title: string;
  date: string;
};

const Articles: React.FC = () => {
  const [articles] = useState<Article[]>([]);

  const skeletonArray = Array.from({ length: 6 });

  const SkeletonArticleCard = () => {
    return (
      <Card
        variant="ghost"
        className="!m-0 p-4 rounded-lg w-full md:w-1/3"
        style={{
          border: "1px solid var(--gray-a6)",
          backgroundColor: "var(--gray-a3)",
        }}
      >
        <Flex direction="column" gap="2">
          <Heading size="3" weight="bold">
            <Skeleton className="w-2/3 h-6 bg-gray-a6 rounded" />
          </Heading>
          <Text color="gray" size="2">
            <Skeleton className="w-1/3 h-4 bg-gray-a6 rounded" />
          </Text>
        </Flex>
      </Card>
    );
  };
  const ArticleCard = ({ title, date }: Article) => {
    return (
      <Card
        className="p-4 rounded-lg w-full md:w-1/3"
        style={{
          border: "1px solid var(--gray-a6)",
          backgroundColor: "var(--gray-a3)",
        }}
      >
        <Flex direction="column" gap="2">
          <Heading size="3" weight="bold">
            {title}
          </Heading>
          <Text color="gray" size="2">
            {date}
          </Text>
        </Flex>
      </Card>
    );
  };
  return (
    <Section>
      <>
        <Heading size="4" weight="bold" align="center" className="mb-8">
          Latest Articles
        </Heading>
        <Hint className="max-w-[450px]">
          Articles will be published here after database, server and rich text
          editor implementation.
        </Hint>
        <Section id="articles" className="py-12">
          <Flex
            direction={{ initial: "column", md: "row" }}
            gap="6"
            justify="center"
            wrap="wrap"
            className="container mx-auto !w-full"
          >
            {articles.length
              ? articles.map((blog, index) => (
                  <ArticleCard key={index} {...blog} />
                ))
              : skeletonArray.map((_, index) => (
                  <SkeletonArticleCard key={index} />
                ))}
          </Flex>
        </Section>
      </>
    </Section>
  );
};

export default Articles;
