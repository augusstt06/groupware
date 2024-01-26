import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { PROJECT_DETAIL_CATEGORY_HOME, PROJECT_SIDEBAR_TASK_ALL } from '@/app/constant/constant'

type State = {
  detailCategory: string
  task: string
}

const initialState: State = {
  detailCategory: PROJECT_DETAIL_CATEGORY_HOME,
  task: PROJECT_SIDEBAR_TASK_ALL,
}

export const projectDeatilCategorySlice = createSlice({
  name: 'projectDeatilCategorySlice',
  initialState,
  reducers: {
    changeProjectDetailCategoryReducer(state, action: PayloadAction<string>) {
      state.detailCategory = action.payload
    },
    changeProjectDetailTaskCategoryReducer(state, action: PayloadAction<string>) {
      state.task = action.payload
    },
  },
})
export const { changeProjectDetailCategoryReducer, changeProjectDetailTaskCategoryReducer } =
  projectDeatilCategorySlice.actions
export default projectDeatilCategorySlice.reducer
