import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type State = {
  postingLikeList: number[]
  commentLikeList: number[]
}
const initialState: State = {
  postingLikeList: [],
  commentLikeList: [],
}

export const boardLikeSlice = createSlice({
  name: 'boardLikeReducer',
  initialState,
  reducers: {
    addPostingLikeReducer(state, action: PayloadAction<number>) {
      state.postingLikeList.push(action.payload)
    },
    deletePostingLikeReducer(state, action: PayloadAction<number>) {
      state.postingLikeList = state.postingLikeList.filter((item) => item !== action.payload)
    },
    addCommentLikeReducer(state, action: PayloadAction<number>) {
      state.commentLikeList.push(action.payload)
    },
    deleteCommentLikeReducer(state, action: PayloadAction<number>) {
      state.commentLikeList = state.commentLikeList.filter((item) => item !== action.payload)
    },
  },
})

export const {
  addPostingLikeReducer,
  deletePostingLikeReducer,
  addCommentLikeReducer,
  deleteCommentLikeReducer,
} = boardLikeSlice.actions
export default boardLikeSlice.reducer
