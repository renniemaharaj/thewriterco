import { EBook } from "../../app/ereader/types";

export type SwordProps = {
  setEBook: (state: EBook) => void;
  asChild?: boolean;
  searchText?: string;
};
