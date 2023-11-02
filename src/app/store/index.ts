"use client";

import { configureStore } from "@reduxjs/toolkit";

import validReducer from "./reducers/validReducer";

export const store = configureStore({
  reducer: { isLoginInfoInputValid: validReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
