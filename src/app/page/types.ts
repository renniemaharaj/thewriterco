import { ResultType } from "../../page/search/type";

export type PageProps = {
  dismissedDeclaration: number;
  searchQuery: string;
  searchResults: ResultType[];
};
