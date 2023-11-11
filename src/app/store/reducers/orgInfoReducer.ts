import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

// FIXME: join state 데이터 형식은 수정예정
type State = {
  createOrg: {
    name: string
    description: string
    organizationType: string
    grades: object[]
    teams: object[]
  }
  joinOrg: {
    name: string
    description: string
    organizationType: string
  }
}

const initialState: State = {
  createOrg: {
    name: '',
    description: '',
    organizationType: 'PUBLIC',
    grades: [
      {
        deleteAccess: true,
        inviteAccess: true,
        maintainAccess: true,
        name: '',
        readAccess: true,
        updateAccess: true,
        writeAccess: true,
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
    name: '',
    description: '',
    organizationType: '',
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
    createOrgTeamReducer(state, action: PayloadAction<{ grades: object[]; teams: object[] }>) {
      state.createOrg.grades = action.payload.grades
      state.createOrg.teams = action.payload.teams
    },
    joinOrgReducer(
      state,
      action: PayloadAction<{ name: string; description: string; organizationType: string }>,
    ) {
      state.joinOrg.name = action.payload.name
      state.joinOrg.description = action.payload.description
      state.joinOrg.organizationType = action.payload.organizationType
    },
  },
})

export const { createOrgReducer, createOrgTeamReducer, joinOrgReducer } = orgInfoReducer.actions

export default orgInfoReducer.reducer
