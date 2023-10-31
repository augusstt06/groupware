import { createSlice } from "@reduxjs/toolkit";

type State = {
  isEmailAvailable: boolean;
  isPwdAvailable: boolean;
};

const initialState: State = {
  isEmailAvailable: false,
  isPwdAvailable: false,
};

export const validSlice = createSlice({
  name: "duplicate Slice",
  initialState,
  reducers: {
    emailCheckReducer(state) {
      state.isEmailAvailable = true;
    },
    pwdCheckReducer(state) {
      state.isPwdAvailable = true;
    },
  },
});

export const { emailCheckReducer, pwdCheckReducer } = validSlice.actions;

export default validSlice.reducer;
