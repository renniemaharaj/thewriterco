import { Box, Text, Flex, Link } from "@radix-ui/themes";
import ImageCarousel from "./ImageCarousel";
import { Result } from "./hooks/types";
import { useEffect, useState } from "react";
import useReportFilter from "./hooks/useReportFilter";

const Current = () => {
  const { resultMatchingURL } = useReportFilter();

  const [currentResult, setCurrentResult] = useState<Result>();

  useEffect(() => {
    if (resultMatchingURL != undefined) {
      setCurrentResult(resultMatchingURL);
      document.body.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [resultMatchingURL]);

  useEffect(() => {
    console.log(currentResult);
  }, [currentResult]);
  return (
    currentResult && (
      <Box className="w-full mb-10">
        <Flex
          direction="column"
          className="gap-6 md:p-8 p-4 rounded-xl shadow-lg max-w-screen-lg mx-auto"
        >
          <Text size="6" weight="bold" className="leading-tight max-w-[600px]">
            {currentResult.title}
          </Text>

          {/* Image */}

          <Box className="overflow-hidden !min-w-[120px] !min-h-[120px] rounded-md border-2 p-2 border-gray-700">
            {currentResult.images?.length ? (
              <ImageCarousel images={currentResult.images} />
            ) : (
              <div className="w-full h-full bg-gray-300 animate-pulse rounded" />
            )}
          </Box>

          <Text size="3" className="leading-relaxed tracking-wide">
            {currentResult.summary}
          </Text>

          <Flex gap="3" wrap="wrap" className="pt-2">
            {currentResult.tags?.map((tag) => (
              <Text
                size="1"
                key={tag}
                className="text-blue-400 bg-blue-950/20 px-2 py-1 rounded-full"
              >
                #{tag}
              </Text>
            ))}
          </Flex>

          <Box className="pt-4">
            <Link href={currentResult.href} className="text-base font-medium">
              Read full report →
            </Link>
          </Box>
        </Flex>
      </Box>
    )
  );
};

export default Current;
