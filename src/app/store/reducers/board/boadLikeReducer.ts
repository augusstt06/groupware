import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type State = {
  likeList: number[]
}
const initialState: State = {
  likeList: [],
}

export const boardLikeSlice = createSlice({
  name: 'boardLikeReducer',
  initialState,
  reducers: {
    addLikeReducer(state, action: PayloadAction<number>) {
      state.likeList.push(action.payload)
    },
    deleteLikeReducer(state, action: PayloadAction<number>) {
      state.likeList = state.likeList.filter((item) => item !== action.payload)
    },
  },
})

export const { addLikeReducer, deleteLikeReducer } = boardLikeSlice.actions
export default boardLikeSlice.reducer
