import { createSlice } from "@reduxjs/toolkit";

type State = {
  isEmailCheck: {
    check: boolean;
  };
  isPwdCheck: {
    check: boolean;
  };
  isPwdVerifyCheck: {
    check: boolean;
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
  isEmailCheck: { check: false },
  isPwdCheck: { check: false },
  isPwdVerifyCheck: { check: false },
  isNameCheck: { check: false },
  isTeamCheck: { check: false },
  isPhoneNumCheck: { check: false },
};

export const checkSlice = createSlice({
  name: "checkReducer",
  initialState,
  reducers: {
    emailCheckReducer(state) {
      if (!state.isEmailCheck.check) {
        state.isEmailCheck.check = true;
      } else {
        state.isEmailCheck.check = false;
      }
    },
    pwdCheckReducer(state) {
      if (!state.isPwdCheck.check) {
        state.isPwdCheck.check = true;
      } else {
        state.isPwdCheck.check = false;
      }
    },
    pwdVerifyCheckReducer(state) {
      if (!state.isPwdVerifyCheck.check) {
        state.isPwdVerifyCheck.check = true;
      } else {
        state.isPwdVerifyCheck.check = false;
      }
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
