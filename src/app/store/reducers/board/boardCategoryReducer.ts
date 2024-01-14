import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type MyBoardType } from '@/app/types/variableTypes'

type State = {
  // category: string
  myBoard: MyBoardType[]
}

const initialState: State = {
  // category: '',
  myBoard: [],
}

export const boardCategorySlice = createSlice({
  name: 'boardCategoryReducer',
  initialState,
  reducers: {
    categoryReduer(state, action: PayloadAction<MyBoardType[]>) {
      state.myBoard = action.payload
    },
  },
})

export const { categoryReduer } = boardCategorySlice.actions
export default boardCategorySlice.reducer
