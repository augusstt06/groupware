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
  position: {
    isCheck: boolean
    value: string
  }
  phoneNumber: {
    isCheck: boolean
    value: string
  }
  organization: {
    create: {
      isCheck: boolean
    }
    join: {
      isCheck: boolean
    }
  }
}

const initialState: State = {
  email: { isCheck: false, value: '' },
  pwd: { isCheck: false, pwdValue: '', pwdConfirmValue: '' },
  name: { isCheck: false, value: '' },
  position: { isCheck: false, value: '' },
  phoneNumber: { isCheck: false, value: '' },
  organization: { create: { isCheck: false }, join: { isCheck: false } },
}

export const signupInfoSlice = createSlice({
  name: 'signupInfoReducer',
  initialState,
  reducers: {
    emailReducer(state, action: PayloadAction<{ isCheck: boolean; value: string }>) {
      state.email = { ...action.payload }
    },
    pwdReducer(
      state,
      action: PayloadAction<{
        isCheck: boolean
        pwdValue: string
        pwdConfirmValue: string
      }>,
    ) {
      state.pwd = { ...action.payload }
    },
    nameReducer(state, action: PayloadAction<{ isCheck: boolean; value: string }>) {
      state.name = { ...action.payload }
    },
    positionReducer(state, action: PayloadAction<{ isCheck: boolean; value: string }>) {
      state.position = { ...action.payload }
    },
    phoneNumberReducer(state, action: PayloadAction<{ isCheck: boolean; value: string }>) {
      state.phoneNumber = { ...action.payload }
    },
    createOrgStatusReducer(state, action: PayloadAction<{ isCheck: boolean }>) {
      state.organization.create = { ...action.payload }
    },
    joinOrgStatusReducer(state, action: PayloadAction<{ isCheck: boolean }>) {
      state.organization.join = { ...action.payload }
    },
  },
})

export const {
  emailReducer,
  pwdReducer,
  nameReducer,
  positionReducer,
  phoneNumberReducer,
  createOrgStatusReducer,
  joinOrgStatusReducer,
} = signupInfoSlice.actions

export default signupInfoSlice.reducer
