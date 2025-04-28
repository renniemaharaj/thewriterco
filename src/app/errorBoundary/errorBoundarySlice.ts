import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./config";
import { RecoveryFunction } from "./types";

const errorBoundarySlice = createSlice({
  name: "elevenLabs",
  initialState,
  reducers: {
    RegisterRecoveryFunction(state, action: PayloadAction<RecoveryFunction>) {
      const exists = state.recoveryFunctions.some(
        (recovery) => recovery.title === action.payload.title,
      );
      if (!exists) {
        state.recoveryFunctions.push(action.payload);
      }
    },
  },
});

export const { RegisterRecoveryFunction } = errorBoundarySlice.actions;

export default errorBoundarySlice;
