"use client";

import { configureStore } from "@reduxjs/toolkit";

import checkReducer from "./reducers/checkReducer";
import pwdReducer from "./reducers/pwdReducer";

export const store = configureStore({
  reducer: {
    isLoginInfoCheck: checkReducer,
    pwdState: pwdReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
