import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type State = {
  createOrg: {
    name: string
    description: string
    organizationType: string
    grades: object
    teams: object
  }
  joinOrg: {
    code: string
  }
}

const initialState: State = {
  createOrg: {
    name: '',
    description: '',
    organizationType: 'PUBLIC',
    grades: [
      {
        deleteAccess: 'TRUE',
        inviteAccess: 'TRUE',
        maintainAccess: 'TRUE',
        name: '',
        readAccess: 'TRUE',
        updateAccess: 'TRUE',
        writeAccess: 'TRUE',
      },
    ],
    teams: [
      {
        description: '',
        name: '',
      },
    ],
  },
  joinOrg: {
    code: '',
  },
}

export const orgInfoReducer = createSlice({
  name: 'orgInfoReducer',
  initialState,
  reducers: {
    createOrgReducer(
      state,
      action: PayloadAction<{ name: string; description: string; organizationType: string }>,
    ) {
      state.createOrg.name = action.payload.name
      state.createOrg.description = action.payload.description
      state.createOrg.organizationType = action.payload.organizationType
    },
    createOrgTeamReducer(state, action: PayloadAction<{ grades: object; teams: object[] }>) {
      state.createOrg.teams = action.payload.teams
    },

    joinOrgReducer(state, action: PayloadAction<{ code: string }>) {
      state.joinOrg.code = action.payload.code
    },
  },
})

export const { createOrgReducer, createOrgTeamReducer, joinOrgReducer } = orgInfoReducer.actions

export default orgInfoReducer.reducer
