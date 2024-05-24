import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import {
  PROJECT_DETAIL_CATEGORY_HOME,
  PROJECT_SIDEBAR_SCHEDULE_ALL,
  PROJECT_SIDEBAR_TASK_ALL,
  PROJECT_SIDEBAR_TODO_ALL,
} from '@/_constant/constant'

type State = {
  detailCategory: string
  task: string
  schedule: string
  todo: string
}

const initialState: State = {
  detailCategory: PROJECT_DETAIL_CATEGORY_HOME,
  task: PROJECT_SIDEBAR_TASK_ALL,
  schedule: PROJECT_SIDEBAR_SCHEDULE_ALL,
  todo: PROJECT_SIDEBAR_TODO_ALL,
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
    changeProjectDetailTodoCategoryReducer(state, action: PayloadAction<string>) {
      state.todo = action.payload
    },
  },
})
export const {
  changeProjectDetailCategoryReducer,
  changeProjectDetailTaskCategoryReducer,
  changeProjectDetailScheduleCategoryReducer,
  changeProjectDetailTodoCategoryReducer,
} = projectDeatilCategorySlice.actions
export default projectDeatilCategorySlice.reducer
