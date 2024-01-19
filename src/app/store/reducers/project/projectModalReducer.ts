import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type State = {
  isCreateProjectModalOpen: boolean
  isCreateProjectIssueModalOpen: boolean
  isProjectAlertModalOpen: boolean
}
const initialState: State = {
  isCreateProjectModalOpen: false,
  isCreateProjectIssueModalOpen: false,
  isProjectAlertModalOpen: false,
}

export const projectModalSlice = createSlice({
  name: 'projectModalSlice',
  initialState,
  reducers: {
    createProjectModalReducer(state) {
      if (state.isCreateProjectModalOpen) state.isCreateProjectModalOpen = false
      else state.isCreateProjectModalOpen = true
    },
    createProjectIssueModalOpenReducer(state) {
      if (state.isCreateProjectIssueModalOpen) state.isCreateProjectIssueModalOpen = false
      else state.isCreateProjectIssueModalOpen = true
    },
    projectAlertModalReducer(state, action: PayloadAction<boolean>) {
      state.isProjectAlertModalOpen = action.payload
    },
  },
})

export const {
  createProjectModalReducer,
  createProjectIssueModalOpenReducer,
  projectAlertModalReducer,
} = projectModalSlice.actions
export default projectModalSlice.reducer
