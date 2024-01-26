import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import {
  PROJECT_DETAIL_CATEGORY_HOME,
  PROJECT_SIDEBAR_SCHEDULE_ALL,
  PROJECT_SIDEBAR_TASK_ALL,
} from '@/app/constant/constant'

type State = {
  detailCategory: string
  task: string
  schedule: string
}

const initialState: State = {
  detailCategory: PROJECT_DETAIL_CATEGORY_HOME,
  task: PROJECT_SIDEBAR_TASK_ALL,
  schedule: PROJECT_SIDEBAR_SCHEDULE_ALL,
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
    changeProjectDetailScheduleCategoryReducer(state, action: PayloadAction<string>) {
      state.schedule = action.payload
    },
  },
})
export const {
  changeProjectDetailCategoryReducer,
  changeProjectDetailTaskCategoryReducer,
  changeProjectDetailScheduleCategoryReducer,
} = projectDeatilCategorySlice.actions
export default projectDeatilCategorySlice.reducer
