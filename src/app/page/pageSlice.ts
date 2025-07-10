import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResultType } from "../../pkg/page/search/type";
import { initialStateWithLocalStorage } from "../utils";
import { initialState } from "./config";

const pageSlice = createSlice({
  name: "pageData",
  initialState: initialStateWithLocalStorage("pageData", initialState),
  reducers: {
    dismissDeclaration(state, action: PayloadAction<number>) {
      state.dismissedDeclaration = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },

    pushResult(state, action: PayloadAction<ResultType>) {
      const exists = state.searchResults.some(
        (item: ResultType) => item.title === action.payload.title,
      );
      if (!exists) {
        state.searchResults.push(action.payload);
      }
    },
  },
});

export const { dismissDeclaration, pushResult, setSearchQuery } =
  pageSlice.actions;

export default pageSlice;
