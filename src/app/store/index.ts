"use client";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
});

export type RoosState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
