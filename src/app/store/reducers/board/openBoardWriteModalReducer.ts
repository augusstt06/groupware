import { createSlice } from '@reduxjs/toolkit'

type State = {
  isOpen: boolean
}

const initialState: State = {
  isOpen: false,
}

export const openBoardWriteModalSlice = createSlice({
  name: 'openBoardWriteModalReducer',
  initialState,
  reducers: {
    openBoardWriteModalReducer(state) {
      if (state.isOpen) {
        state.isOpen = false
      } else {
        state.isOpen = true
      }
    },
  },
})

export const { openBoardWriteModalReducer } = openBoardWriteModalSlice.actions
export default openBoardWriteModalSlice.reducer
