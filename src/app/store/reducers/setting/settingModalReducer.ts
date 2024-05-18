import { createSlice } from '@reduxjs/toolkit'

type State = {
  isOpen: boolean
}

const initialState: State = {
  isOpen: false,
}

export const settingModalSlice = createSlice({
  name: 'settingModalSlice',
  initialState,
  reducers: {
    openSettingModalReducer(state) {
      if (state.isOpen) {
        state.isOpen = false
      } else {
        state.isOpen = true
      }
    },
  },
})
export const { openSettingModalReducer } = settingModalSlice.actions

export default settingModalSlice.reducer
