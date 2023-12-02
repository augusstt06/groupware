import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type State = {
  email: {
    value: string
  }
  pwd: {
    value: string
  }
}

const initialState: State = {
  email: { value: '' },
  pwd: { value: '' },
}

export const loginInfoSlice = createSlice({
  name: 'loginInfoReducer',
  initialState,
  reducers: {
    emailReducer(state, action: PayloadAction<{ value: string }>) {
      state.email = { ...action.payload }
    },
    pwdReducer(state, action: PayloadAction<{ value: string }>) {
      state.pwd = { ...action.payload }
    },
    resetReducer(state) {
      state.email.value = ''
      state.pwd.value = ''
    },
  },
})

export const { emailReducer, pwdReducer, resetReducer } = loginInfoSlice.actions
export default loginInfoSlice.reducer
