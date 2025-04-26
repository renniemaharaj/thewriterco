import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./config";
import { ToastProps } from "./types";

const toastSlice = createSlice({
  name: "toast",
  initialState: initialState,
  reducers: {
    PushToast(state, action: PayloadAction<ToastProps>) {
      state.toasts.push({
        message: action.payload.message,
        success: action.payload.success,
      });
    },
  },
});

export const { PushToast } = toastSlice.actions;

export default toastSlice;
