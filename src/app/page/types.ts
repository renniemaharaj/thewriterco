import { ResultType } from "../../pkg/page/Search/type";

export type PageProps = {
  dismissedDeclaration: number;
  searchQuery: string;
  searchResults: ResultType[];
};
