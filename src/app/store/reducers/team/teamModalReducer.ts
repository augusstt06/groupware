import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type State = {
  isCreateTeamModalOpen: boolean
}

const initialState: State = {
  isCreateTeamModalOpen: false,
}

export const teamModalSlice = createSlice({
  name: 'teamModalSlice',
  initialState,
  reducers: {
    createTeamModalReducer(state, action: PayloadAction<boolean>) {
      state.isCreateTeamModalOpen = action.payload
    },
  },
})

export const { createTeamModalReducer } = teamModalSlice.actions
export default teamModalSlice.reducer
