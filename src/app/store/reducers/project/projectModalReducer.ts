import { createSlice } from '@reduxjs/toolkit'

type State = {
  createModal: boolean
}
const initialState: State = {
  createModal: false,
}

export const projectModalSlice = createSlice({
  name: 'projectModalReducer',
  initialState,
  reducers: {
    createProjectModalReducer(state) {
      if (state.createModal) state.createModal = false
      else state.createModal = true
    },
  },
})

export const { createProjectModalReducer } = projectModalSlice.actions
export default projectModalSlice.reducer
