import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type State = {
  pwd: string;
};

const initialState: State = {
  pwd: "",
};

export const pwdStateSlice = createSlice({
  name: "pwdStateReducer",
  initialState,
  reducers: {
    pwdStateReducer(state, action: PayloadAction<{ pwd: string }>) {
      state.pwd = action.payload.pwd;
    },
  },
});

// export const { pwdReducer } = pwdStateSlice.actions;
export const { pwdStateReducer } = pwdStateSlice.actions;

export default pwdStateSlice.reducer;
