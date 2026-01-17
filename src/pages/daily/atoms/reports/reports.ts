import { atomWithReducer } from "jotai/utils";
import type { Report } from "../../hooks/types";
import type { ReportAction } from "./types";

const reportReducer = (state: Report[], action: ReportAction): Report[] => {
  switch (action.type) {
    case "ADD":
      return state.some(report => (report.searchQuery ?? "") === (action.payload.searchQuery ?? ""))
        ? state
        : [...state, action.payload];

    case "REMOVE":
      return state.filter(
        report => (report.searchQuery ?? "") !== (action.payload.searchQuery ?? ""),
      );

    case "CLEAR":
      return [];

    default:
      return state;
  }
};

export const reportsAtom = atomWithReducer<Report[], ReportAction>([], reportReducer);
