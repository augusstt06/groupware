import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type State = {
  isEmailCheck: {
    check: boolean;
    value: string;
  };
  isPwdCheck: {
    check: boolean;
    value: string;
  };
  isPwdVerifyCheck: {
    check: boolean;
    value: string;
  };
  isNameCheck: {
    check: boolean;
  };
  isTeamCheck: {
    check: boolean;
  };
  isPhoneNumCheck: {
    check: boolean;
  };
};

const initialState: State = {
  isEmailCheck: { check: false, value: "" },
  isPwdCheck: { check: false, value: "" },
  isPwdVerifyCheck: { check: false, value: "" },
  isNameCheck: { check: false },
  isTeamCheck: { check: false },
  isPhoneNumCheck: { check: false },
};

export const checkSlice = createSlice({
  name: "checkReducer",
  initialState,
  reducers: {
    emailCheckReducer(
      state,
      action: PayloadAction<{ check: boolean; value: string }>
    ) {
      // if (!state.isEmailCheck.check) {
      state.isEmailCheck.check = action.payload.check;
      state.isEmailCheck.value = action.payload.value;
      // } else {
      //   state.isEmailCheck.check = false;
      //   state.isEmailCheck.value = "";
      // }
    },
    pwdCheckReducer(
      state,
      action: PayloadAction<{ check: boolean; value: string }>
    ) {
      // if (!state.isPwdCheck.check) {
      state.isPwdCheck.check = action.payload.check;
      state.isPwdCheck.value = action.payload.value;
      // } else {
      //   state.isPwdCheck.check = false;
      //   state.isPwdCheck.value = "";
      // }
    },
    pwdVerifyCheckReducer(
      state,
      action: PayloadAction<{ check: boolean; value: string }>
    ) {
      // if (!state.isPwdVerifyCheck.check) {
      state.isPwdVerifyCheck.check = action.payload.check;
      state.isPwdVerifyCheck.value = action.payload.value;
      // } else {
      //   state.isPwdVerifyCheck.check = false;
      //   state.isPwdVerifyCheck.value = "";
      // }
    },
    nameCheckReducer(state) {
      if (!state.isPwdVerifyCheck.check) {
        state.isNameCheck.check = true;
      } else {
        state.isNameCheck.check = false;
      }
    },
    teamCheckReducer(state) {
      if (!state.isTeamCheck.check) {
        state.isTeamCheck.check = true;
      } else {
        state.isTeamCheck.check = false;
      }
    },
    phoneNumCheckReducer(state) {
      if (!state.isPhoneNumCheck.check) {
        state.isPhoneNumCheck.check = true;
      } else {
        state.isPhoneNumCheck.check = false;
      }
    },
  },
});

export const {
  emailCheckReducer,
  pwdCheckReducer,
  pwdVerifyCheckReducer,
  nameCheckReducer,
  teamCheckReducer,
  phoneNumCheckReducer,
} = checkSlice.actions;

export default checkSlice.reducer;
