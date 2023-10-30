"use client";

import { configureStore } from "@reduxjs/toolkit";

import duplicateReducer from "./reducers/duplicateReducer";

export const store = configureStore({
  reducer: { checkDuplicate: duplicateReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
