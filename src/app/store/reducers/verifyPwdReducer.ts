import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type State = {
  controlValue: {
    pwd: string;
    verifyPwd: string;
    default: string;
  };
  isVerify: boolean;
};

const initialState: State = {
  controlValue: {
    pwd: "",
    verifyPwd: "",
    default: "",
  },
  isVerify: false,
};

export const verifyPwdSlice = createSlice({
  name: "verify pwd slice",
  initialState,
  reducers: {
    verifyPwdReducer(
      state,
      action: PayloadAction<{ pwd: string; verifyPwd: string }>
    ) {
      state.controlValue.pwd = action.payload.pwd;
      state.controlValue.verifyPwd = action.payload.verifyPwd;
      if (state.controlValue.pwd === state.controlValue.verifyPwd) {
        state.isVerify = true;
      }
    },
  },
});

export const { verifyPwdReducer } = verifyPwdSlice.actions;

export default verifyPwdSlice.reducer;
