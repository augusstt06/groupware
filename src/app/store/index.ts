"use client";

import { configureStore } from "@reduxjs/toolkit";

import validReducer from "./reducers/validReducer";

export const store = configureStore({
  reducer: { isStep1InputValid: validReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
