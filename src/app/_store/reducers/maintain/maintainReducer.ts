import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { FALSE, KEY_LOGIN_COMPLETE } from '@/_constant/constant'

type State = {
  [KEY_LOGIN_COMPLETE]: string
}

const initialState: State = {
  [KEY_LOGIN_COMPLETE]: FALSE,
}

export const maintainSlice = createSlice({
  name: 'maintainSlice',
  initialState,
  reducers: {
    updateLoginCompleteReducer(state, action: PayloadAction<string>) {
      state[KEY_LOGIN_COMPLETE] = action.payload
    },
  },
})

export const { updateLoginCompleteReducer } = maintainSlice.actions

export default maintainSlice.reducer
