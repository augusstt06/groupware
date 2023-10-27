import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TestState = {
  isTest: boolean;
};

const initialState: TestState = {
  isTest: false,
};

export const testSlice = createSlice({
  name: "theme adjust",
  initialState,
  reducers: {
    test: (state, action: PayloadAction<boolean>) => {
      return {
        isTest: action.payload,
      };
    },
  },
});

export const { test } = testSlice.actions;

export default testSlice.reducer;
