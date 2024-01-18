import { createSlice } from '@reduxjs/toolkit'

type State = {
  isCreateProjectModalOpen: boolean
  isCreateProjectIssueModalOpen: boolean
}
const initialState: State = {
  isCreateProjectModalOpen: false,
  isCreateProjectIssueModalOpen: false,
}

export const projectModalSlice = createSlice({
  name: 'projectModalReducer',
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
  },
})

export const { createProjectModalReducer, createProjectIssueModalOpenReducer } =
  projectModalSlice.actions
export default projectModalSlice.reducer
