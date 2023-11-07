"use client";

import { configureStore } from "@reduxjs/toolkit";

import loginInfoReducer from "./reducers/loginInfoReducer";

export const store = configureStore({
  reducer: {
    loginInfo: loginInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
