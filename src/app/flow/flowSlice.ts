import { createSlice } from "@reduxjs/toolkit";

const flowSlice = createSlice({
  name: "chat",
  initialState: {
    flowSliceToggle: false,
  },
  reducers: {
    toggleFlowSlice(state) {
      state.flowSliceToggle = !state.flowSliceToggle;
    },
  },
});

export const { toggleFlowSlice } = flowSlice.actions;

export default flowSlice;
