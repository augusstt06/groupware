import { createSlice } from "@reduxjs/toolkit";

type State = {
  isCheck: boolean;
  isDuplicate: boolean;
};

const initialState: State = {
  isCheck: false,
  isDuplicate: false,
};

export const duplicateSlice = createSlice({
  name: "duplicate Slice",
  initialState,
  reducers: {
    isDataUnique(state) {
      if (!state.isCheck) {
        !state.isCheck;
      }
      if (!state.isDuplicate) {
        !state.isDuplicate;
      }
    },
    isDataDuplicate(state) {
      if (!state.isCheck) {
        !state.isCheck;
      }
      if (state.isDuplicate) {
        !state.isDuplicate;
      }
    },
  },
});

export const { isDataDuplicate, isDataUnique } = duplicateSlice.actions;

export default duplicateSlice.reducer;
