import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type State = {
  createOrg: {
    name: string
    description: string
    organizationType: string
  }
  grades: {
    deleteAccess: string
    inviteAccess: string
    maintainAccess: string
    name: string
    readAccss: string
    updateAccess: string
    writeAccess: string
  }
  teams: Array<{ description: string; name: string }>
  currentTeam: {
    name: string
    description: string
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
  },
  grades: {
    deleteAccess: 'TRUE',
    inviteAccess: 'TRUE',
    maintainAccess: 'TRUE',
    name: '',
    readAccss: 'TRUE',
    updateAccess: 'TRUE',
    writeAccess: 'TRUE',
  },
  teams: [],
  currentTeam: { description: '', name: '' },
  joinOrg: {
    code: '',
  },
}

type gradeActionType = {
  deleteAccess: string
  inviteAccess: string
  maintainAccess: string
  name: string
  readAccss: string
  updateAccess: string
  writeAccess: string
}

export const orgInfoReducer = createSlice({
  name: 'orgInfoReducer',
  initialState,
  reducers: {
    createOrgReducer(
      state,
      action: PayloadAction<{ name: string; description: string; organizationType: string }>,
    ) {
      state.createOrg = { ...action.payload }
    },
    setGradeReducer(state, action: PayloadAction<gradeActionType>) {
      state.grades = { ...action.payload }
    },
    createOrgTeamReducer(state, action: PayloadAction<{ description: string; name: string }>) {
      state.teams = [...state.teams, action.payload]
      state.currentTeam = {
        description: '',
        name: '',
      }
    },
    deleteOrgTeamReducer(state, action: PayloadAction<{ name: string; description: string }>) {
      const { name, description } = action.payload
      state.teams = state.teams.filter(
        (team) => team.name !== name || team.description !== description,
      )
    },
    updateCurrentOrgTeamReducer(
      state,
      action: PayloadAction<{ description: string; name: string }>,
    ) {
      state.currentTeam = { ...action.payload }
    },
    joinOrgReducer(state, action: PayloadAction<{ code: string }>) {
      state.joinOrg.code = action.payload.code
    },
  },
})

export const {
  createOrgReducer,
  setGradeReducer,
  createOrgTeamReducer,
  updateCurrentOrgTeamReducer,
  deleteOrgTeamReducer,
  joinOrgReducer,
} = orgInfoReducer.actions

export default orgInfoReducer.reducer
