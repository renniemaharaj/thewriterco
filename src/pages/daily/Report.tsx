import React, { useCallback } from "react";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { Report as ReportProps } from "./hooks/types";
import Result from "./Result";
import useReportFilter from "./hooks/useReportFilter";
import { capitalizeBigWords } from "./utils";
import Motion from "../../page/Motion";

export const Report = ({ report }: { report: ReportProps }) => {
  const { resultMatchesQuery } = useReportFilter();

  const oneOrMoreResultMatches = useCallback(() => {
    if (!report.results) return false;
    return report.results.some((result) => resultMatchesQuery(result));
  }, [report, resultMatchesQuery]);

  return (
    oneOrMoreResultMatches() && (
      <Flex className="!flex-col !w-full" mt="3">
        <Heading size="4" mb="1">
          {capitalizeBigWords(report.searchQuery)}
        </Heading>
        <Text size="1" color="gray" mb="4">
          {new Date(report.date).toLocaleDateString()}
        </Text>

        <Flex className="!flex-row flex-wrap gap-4">
          {report.results.map((result, i) => (
            <React.Fragment key={"result" + i}>
              <Motion index={i} className="w-full md:!w-[48%]">
                <Result
                  result={result}
                  ReportSearchQuery={report.searchQuery}
                />
              </Motion>
            </React.Fragment>
          ))}
        </Flex>
      </Flex>
    )
  );
};

export default Report;
