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
  teams: object[]
  currentTeam: {
    teamName: string
    teamDescription: string
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
    name: 'TRUE',
    readAccss: 'TRUE',
    updateAccess: 'TRUE',
    writeAccess: 'TRUE',
  },
  teams: [],
  currentTeam: { teamName: '', teamDescription: '' },
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
    createOrgTeamReducer(
      state,
      action: PayloadAction<{ teamName: string; teamDescription: string }>,
    ) {
      state.teams = [...state.teams, action.payload]
      state.currentTeam = {
        teamName: '',
        teamDescription: '',
      }
    },
    updateCurrentOrgTeamReducer(
      state,
      action: PayloadAction<{ teamName: string; teamDescription: string }>,
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
  joinOrgReducer,
} = orgInfoReducer.actions

export default orgInfoReducer.reducer
