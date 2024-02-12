import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type State = {
  isCreateTeamModalOpen: boolean
  isTeamInviteModalOpen: boolean
}

const initialState: State = {
  isCreateTeamModalOpen: false,
  isTeamInviteModalOpen: false,
}

export const teamModalSlice = createSlice({
  name: 'teamModalSlice',
  initialState,
  reducers: {
    createTeamModalReducer(state, action: PayloadAction<boolean>) {
      state.isCreateTeamModalOpen = action.payload
    },
    teamInviteModalReducer(state, action: PayloadAction<boolean>) {
      state.isTeamInviteModalOpen = action.payload
    },
  },
})

export const { createTeamModalReducer, teamInviteModalReducer } = teamModalSlice.actions
export default teamModalSlice.reducer
