import type { Report } from "../../hooks/types";

export type ReportAction =
  | { type: "ADD"; payload: Report }
  | { type: "REMOVE"; payload: Report } // by searchQuery
  | { type: "CLEAR" };
