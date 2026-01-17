import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./config";
import type { RecoveryFunction } from "./types";

const errorBoundarySlice = createSlice({
  name: "errorBoundary",
  initialState,
  reducers: {
    RegisterRecoveryFunction(state, action: PayloadAction<RecoveryFunction>) {
      const exists = state.recoveryFunctions.some(
        recovery => recovery.title === action.payload.title,
      );
      if (!exists) {
        state.recoveryFunctions.push(action.payload);
      }
    },
  },
});

export const { RegisterRecoveryFunction } = errorBoundarySlice.actions;

export default errorBoundarySlice;
