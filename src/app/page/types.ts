import { ResultType } from "../../pkg/page/search/type";

export type PageProps = {
  dismissedDeclaration: number;
  searchQuery: string;
  searchResults: ResultType[];
};
