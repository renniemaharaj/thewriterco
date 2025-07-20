import { useAtomValue } from "jotai";
import { searchQueryAtom } from "../../../page/search/atoms/search";
import { useCallback } from "react";
import { Result } from "./types";
import useReportReducers from "./useReportReducers";
import { useParams } from "react-router-dom";
import { blankResult } from "./confg";
import { customDecodeURI } from "../utils";

const useReportFilter = () => {
  const searchTextQuery = useAtomValue(searchQueryAtom);

  const { searchQuery, resultTitle } = useParams();

  const { state } = useReportReducers();

  const resultMatchingURL = useCallback(() => {
    const notFoundReturn =
      (customDecodeURI(searchQuery || "") ||
        customDecodeURI(resultTitle || "")) &&
      !state.length
        ? blankResult
        : undefined;

    const reportInURL = state.filter(
      (report) =>
        report.searchQuery.toLowerCase() ===
        customDecodeURI(searchQuery || "")?.toLocaleLowerCase(),
    );
    if (!reportInURL[0]) return notFoundReturn;

    const resultInURL = reportInURL[0].results.filter(
      (res) =>
        res.title.toLowerCase() ===
        customDecodeURI(resultTitle || "")?.toLocaleLowerCase(),
    );
    if (!resultInURL[0]) return notFoundReturn;

    return resultInURL[0];
  }, [searchQuery, resultTitle, state]);

  const resultMatchesQuery = useCallback(
    (result: Result) => {
      if (!searchTextQuery) return true;

      const keywords = searchTextQuery
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);

      return keywords.some(
        (keyword) =>
          result.title?.toLowerCase().includes(keyword) ||
          result.summary?.toLowerCase().includes(keyword) ||
          result.tags?.some((tag) => tag.toLowerCase().includes(keyword)) ||
          result.politicalBiases?.some((bias) =>
            bias.toLowerCase().includes(keyword),
          ) ||
          result.images?.some((img) => img.toLowerCase().includes(keyword)),
      );
    },
    [searchTextQuery],
  );

  return { resultMatchesQuery, searchTextQuery, resultMatchingURL };
};

export default useReportFilter;
