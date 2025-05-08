import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getInitialPageData } from "./utils";

const pageSlice = createSlice({
  name: "pageData",
  initialState: getInitialPageData(),
  reducers: {
    dismissDeclaration(state, action: PayloadAction<number>) {
      state.dismissedDeclaration = action.payload;
    },
  },
});

export const { dismissDeclaration } = pageSlice.actions;

export default pageSlice;
