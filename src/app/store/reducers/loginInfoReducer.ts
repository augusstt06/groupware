import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type State = {
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
    value: string
  }
  phoneNumber: {
    isCheck: boolean
    value: string
  }
}

const initialState: State = {
  email: { isCheck: false, value: '' },
  pwd: { isCheck: false, pwdValue: '', pwdConfirmValue: '' },
  name: { isCheck: false, value: '' },
  phoneNumber: { isCheck: false, value: '' },
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
    nameReducer(state, action: PayloadAction<{ isCheck: boolean; value: string }>) {
      state.name.isCheck = action.payload.isCheck
      state.name.value = action.payload.value
    },
    phoneNumberReducer(state, action: PayloadAction<{ isCheck: boolean; value: string }>) {
      state.phoneNumber.isCheck = action.payload.isCheck
      state.phoneNumber.value = action.payload.value
    },
  },
})

export const { emailReducer, pwdReducer, nameReducer, phoneNumberReducer } = loginInfoSlice.actions

export default loginInfoSlice.reducer
