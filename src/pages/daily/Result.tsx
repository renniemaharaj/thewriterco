import { Badge, Card, Flex, Link, Text } from "@radix-ui/themes";
import { memo, useMemo } from "react";
import ImageCarousel from "./ImageCarousel";
import StarRating from "./StarRating";
import type { Result as ResultProps } from "./hooks/types";
import useReportFilter from "./hooks/useReportFilter";
import { customEncodeURI } from "./utils";

const Result = ({
  result,
  ReportSearchQuery,
  currentResult,
}: {
  result: ResultProps;
  ReportSearchQuery: string;
  currentResult?: ResultProps;
}) => {
  const { resultMatchesQuery } = useReportFilter();

  const isCurrentResult = useMemo(
    () => currentResult?.title === result.title,
    [currentResult, result],
  );

  const resultClassName = useMemo(
    () => `!w-full !p-3 ${isCurrentResult ? "animate-pulse" : ""}`,
    [isCurrentResult],
  );

  // Summary skeleton placeholder
  const SummarySkeleton = memo(() => (
    <div className="space-y-1">
      <div className="h-5 w-[90%] bg-gray-300 animate-pulse rounded" />
      <div className="h-5 w-[85%] bg-gray-300 animate-pulse rounded" />
      <div className="h-5 w-[70%] bg-gray-300 animate-pulse rounded" />
    </div>
  ));

  // Tags skeleton placeholder
  const TagsSkeleton = memo(() => (
    <div className="flex gap-2">
      <div className="w-12 h-5 bg-gray-300 rounded animate-pulse" />
      <div className="w-16 h-5 bg-gray-300 rounded animate-pulse" />
      <div className="w-16 h-5 bg-gray-300 rounded animate-pulse" />
      <div className="w-16 h-5 bg-gray-300 rounded animate-pulse" />
      <div className="w-16 h-5 bg-gray-300 rounded animate-pulse" />
    </div>
  ));

  return (
    resultMatchesQuery(result) && (
      <Card size="1" variant="surface" className={resultClassName}>
        <Flex direction="column" gap="3">
          {/* Title */}
          <div className="h-5 w-[30rem]">
            {result.title ? (
              <Text size="2" weight="bold" className="line-clamp-1">
                {result.title}
              </Text>
            ) : (
              <></>
            )}
          </div>

          {/* Main row: image + content */}
          <Flex direction="row" gap="3">
            {/* Image */}
            <div className="w-[120px] h-[120px] overflow-hidden rounded">
              {result.images?.length ? (
                <ImageCarousel images={result.images} />
              ) : (
                <div className="w-full h-full bg-gray-300 animate-pulse rounded" />
              )}
            </div>

            <Flex direction="column" justify="between" className="flex-1 gap-1">
              {/* Summary */}
              <div className="h-[4.5rem] w-full overflow-hidden">
                {result.summary ? (
                  <Text size="2" className="line-clamp-3">
                    {result.summary}
                  </Text>
                ) : (
                  <SummarySkeleton />
                )}
              </div>

              {/* Tags */}
              <Flex gap="1" wrap="wrap" mt="2" className="min-h-[1rem]">
                {result.tags?.length ? (
                  result.tags.map(tag => (
                    <Text size="1" color="blue" key={tag}>
                      #{tag}
                    </Text>
                  ))
                ) : (
                  <TagsSkeleton />
                )}
              </Flex>

              {/* Biases */}
              <Flex gap="1" wrap="wrap" mt="2" className="min-h-[1rem]">
                {result.politicalBiases?.length > 0 &&
                  result.politicalBiases.map(bias => (
                    <Badge size="1" color="blue" key={bias}>
                      {bias}
                    </Badge>
                  ))}
              </Flex>
            </Flex>
          </Flex>
          {/* Action row */}
          <Flex direction="row" justify="between" align="center" className="!w-full" mt="2" gap="4">
            {result.href ? (
              <Link href={result.href}>View source →</Link>
            ) : (
              <div className="w-[6rem] h-4 bg-gray-300 animate-pulse rounded" />
            )}
            <StarRating alignment={result.alignment} />
            <Link
              href={`/daily/${customEncodeURI(ReportSearchQuery.toLowerCase())}/${customEncodeURI(result.title.toLowerCase())}`}
            >
              Read more →
            </Link>
          </Flex>
        </Flex>
      </Card>
    )
  );
};

export default Result;
