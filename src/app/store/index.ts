"use client";

import { configureStore } from "@reduxjs/toolkit";

import validReducer from "./reducers/validReducer";
import verifyPwdReducer from "./reducers/verifyPwdReducer";

export const store = configureStore({
  reducer: {
    isLoginInfoInputValid: validReducer,
    verifyPassword: verifyPwdReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
