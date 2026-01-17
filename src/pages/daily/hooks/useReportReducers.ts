import { useAtom } from "jotai";
import { useCallback } from "react";
import { useTransitionNavigation } from "../../../pkg/hooks/useTransitionNavigation";
import { reportsAtom } from "../atoms/reports/reports";
import type { Report, Result } from "./types";

const blankResult: Result = {
  title: "",
  summary: "",
  commentaries: [],
  href: "/",
  politicalBiases: [],
};

const blankReport: Report = {
  searchQuery: "Try selecting tags to filter results",
  results: [],
  title: "",
  date: "",
};

const useReportReducers = () => {
  const [reports, dispatch] = useAtom(reportsAtom);

  const { path } = useTransitionNavigation();

  const put = (report: Report) => {
    dispatch({ type: "ADD", payload: report });
  };

  const remove = (report: Report) => {
    dispatch({ type: "REMOVE", payload: report });
  };

  const reset = () => dispatch({ type: "CLEAR" });

  const skeletonResults = Array.from({ length: 4 }).map(() => blankResult);
  const skeletonReport = { ...blankReport, results: skeletonResults };

  const returnState = useCallback(() => {
    return path.startsWith("search") || !(reports.length > 0) ? [skeletonReport] : reports;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, reports]);
  return {
    state: returnState(),
    put,
    remove,
    reset,
  };
};

export default useReportReducers;
