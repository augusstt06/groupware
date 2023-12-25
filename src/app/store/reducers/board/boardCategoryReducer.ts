import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { ANNOUNCE } from '@/app/constant/constant'

type State = {
  category: string
}

const initialState: State = {
  category: '',
}

export const boardCategorySlice = createSlice({
  name: 'boardCategoryReducer',
  initialState,
  reducers: {
    categoryReduer(state, action: PayloadAction<string>) {
      switch (action.payload) {
        case ANNOUNCE:
          state.category = '공지사항'
      }
    },
  },
})

export const { categoryReduer } = boardCategorySlice.actions
export default boardCategorySlice.reducer
