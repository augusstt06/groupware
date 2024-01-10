import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type State = {
  categoryList: Array<{
    boardName: string
    menuList: Array<{
      createdAt: string
      id: number
      name: string
      organizationId: number
      updatedAt: string
    }>
  }>
}
const initialState: State = {
  categoryList: [],
}

export const boardCategoryListSlice = createSlice({
  name: 'boardCategoryListReducer',
  initialState,
  reducers: {
    addBoardCategoryListReducer(
      state,
      action: PayloadAction<{
        boardName: string
        menuList: Array<{
          createdAt: string
          id: number
          name: string
          organizationId: number
          updatedAt: string
        }>
      }>,
    ) {
      state.categoryList = []
      if (!state.categoryList.includes(action.payload)) {
        state.categoryList.push(action.payload)
      }
    },
  },
})

export const { addBoardCategoryListReducer } = boardCategoryListSlice.actions
export default boardCategoryListSlice.reducer
