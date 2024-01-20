import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type State = {
  isCreateProjectModalOpen: boolean
  isCreateProjectIssueModalOpen: boolean
  isProjectAlertModalOpen: boolean
  isProjectInviteModalOpen: boolean
}
const initialState: State = {
  isCreateProjectModalOpen: false,
  isCreateProjectIssueModalOpen: false,
  isProjectAlertModalOpen: false,
  isProjectInviteModalOpen: false,
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
    projectInviteModalReducer(state, action: PayloadAction<boolean>) {
      state.isProjectInviteModalOpen = action.payload
    },
  },
})

export const {
  createProjectModalReducer,
  createProjectIssueModalOpenReducer,
  projectAlertModalReducer,
  projectInviteModalReducer,
} = projectModalSlice.actions
export default projectModalSlice.reducer
