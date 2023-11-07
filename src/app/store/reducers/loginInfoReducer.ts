import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type State = {
  email: {
    isCheck: boolean;
    value: string;
  };
  pwd: {
    isCheck: boolean;
    value: string;
  };
  pwdConfirm: {
    isCheck: boolean;
    value: string;
  };
  name: {
    isCheck: boolean;
  };
  team: {
    isCheck: boolean;
  };
  phoneNumber: {
    isCheck: boolean;
  };
};

const initialState: State = {
  email: { isCheck: false, value: "" },
  pwd: { isCheck: false, value: "" },
  pwdConfirm: { isCheck: false, value: "" },
  name: { isCheck: false },
  team: { isCheck: false },
  phoneNumber: { isCheck: false },
};

export const loginInfoSlice = createSlice({
  name: "isCheckReducer",
  initialState,
  reducers: {
    emailReducer(
      state,
      action: PayloadAction<{ isCheck: boolean; value: string }>
    ) {
      state.email.isCheck = action.payload.isCheck;
      state.email.value = action.payload.value;
    },
    pwdReducer(
      state,
      action: PayloadAction<{ isCheck: boolean; value: string }>
    ) {
      state.pwd.isCheck = action.payload.isCheck;
      state.pwd.value = action.payload.value;
    },
    pwdConfirmReducer(
      state,
      action: PayloadAction<{ isCheck: boolean; value: string }>
    ) {
      state.pwdConfirm.isCheck = action.payload.isCheck;
      state.pwdConfirm.value = action.payload.value;
    },
    nameReducer(state) {
      if (!state.pwdConfirm.isCheck) {
        state.name.isCheck = true;
      } else {
        state.name.isCheck = false;
      }
    },
    teamReducer(state) {
      if (!state.team.isCheck) {
        state.team.isCheck = true;
      } else {
        state.team.isCheck = false;
      }
    },
    phoneNumberReducer(state) {
      if (!state.phoneNumber.isCheck) {
        state.phoneNumber.isCheck = true;
      } else {
        state.phoneNumber.isCheck = false;
      }
    },
  },
});

export const {
  emailReducer,
  pwdReducer,
  pwdConfirmReducer,
  nameReducer,
  teamReducer,
  phoneNumberReducer,
} = loginInfoSlice.actions;

export default loginInfoSlice.reducer;
