import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type State = {
  isDuplicate: boolean;
};

const initialState: State = {
  isDuplicate: false,
};

export const duplicateSlice = createSlice({
  name: "duplicate Slice",
  initialState,
  reducers: {
    handleCheckDuplicate: (state, action: PayloadAction<boolean>) => {
      return {
        isDuplicate: action.payload,
      };
    },
  },
});

export const { handleCheckDuplicate } = duplicateSlice.actions;

export default duplicateSlice.reducer;
