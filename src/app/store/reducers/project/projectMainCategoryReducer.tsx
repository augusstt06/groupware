import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { PROJECT_MAIN_CATEGORY_ALL } from '@/app/constant/constant'

type State = {
  selectProjectMenu: string
}

const initialState: State = {
  selectProjectMenu: PROJECT_MAIN_CATEGORY_ALL,
}

export const projectMainCategorySlice = createSlice({
  name: 'projectMainCategorySlice',
  initialState,
  reducers: {
    changeProjectMainCategoryReducer(state, action: PayloadAction<string>) {
      state.selectProjectMenu = action.payload
    },
  },
})

export const { changeProjectMainCategoryReducer } = projectMainCategorySlice.actions
export default projectMainCategorySlice.reducer
