import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface State {
  email: {
    isCheck: boolean
    value: string
  }
  pwd: {
    isCheck: boolean
    pwdValue: string
    pwdConfirmValue: string
  }
  name: {
    isCheck: boolean
  }
  team: {
    isCheck: boolean
  }
  phoneNumber: {
    isCheck: boolean
  }
}

const initialState: State = {
  email: { isCheck: false, value: '' },
  pwd: { isCheck: false, pwdValue: '', pwdConfirmValue: '' },
  name: { isCheck: false },
  team: { isCheck: false },
  phoneNumber: { isCheck: false },
}

export const loginInfoSlice = createSlice({
  name: 'loginInfoReducer',
  initialState,
  reducers: {
    emailReducer(state, action: PayloadAction<{ isCheck: boolean; value: string }>) {
      state.email.isCheck = action.payload.isCheck
      state.email.value = action.payload.value
    },
    pwdReducer(
      state,
      action: PayloadAction<{
        isCheck: boolean
        pwdValue: string
        pwdConfirmValue: string
      }>,
    ) {
      state.pwd.isCheck = action.payload.isCheck
      state.pwd.pwdValue = action.payload.pwdValue
      state.pwd.pwdConfirmValue = action.payload.pwdConfirmValue
    },
    nameReducer(state) {
      if (!state.pwd.isCheck) {
        state.name.isCheck = true
      } else {
        state.name.isCheck = false
      }
    },
    teamReducer(state) {
      if (!state.team.isCheck) {
        state.team.isCheck = true
      } else {
        state.team.isCheck = false
      }
    },
    phoneNumberReducer(state) {
      if (!state.phoneNumber.isCheck) {
        state.phoneNumber.isCheck = true
      } else {
        state.phoneNumber.isCheck = false
      }
    },
  },
})

export const { emailReducer, pwdReducer, nameReducer, teamReducer, phoneNumberReducer } =
  loginInfoSlice.actions

export default loginInfoSlice.reducer
