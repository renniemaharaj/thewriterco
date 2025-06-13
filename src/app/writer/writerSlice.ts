import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getInitialWriterData } from "./utils";

const writerSlice = createSlice({
  name: "writer",
  initialState: getInitialWriterData(),
  reducers: {
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
  },
});

export const { setContent } = writerSlice.actions;

export default writerSlice;
