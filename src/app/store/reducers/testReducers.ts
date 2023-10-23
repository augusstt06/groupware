import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface testState {
  isTest: boolean;
}

const initialState: testState = {
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
