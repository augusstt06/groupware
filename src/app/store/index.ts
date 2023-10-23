"use client";

import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./reducers/testReducers";

export const store = configureStore({
  reducer: { testReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
