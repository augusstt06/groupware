import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type State = {
  createOrg: {
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
  },

  joinOrg: {
    code: '',
  },
}

export const orgInfoSlice = createSlice({
  name: 'orgInfoReducer',
  initialState,
  reducers: {
    createOrgReducer(state, action: PayloadAction<{ name: string; description: string }>) {
      state.createOrg = { ...action.payload }
    },

    joinOrgReducer(state, action: PayloadAction<{ code: string }>) {
      state.joinOrg = { ...action.payload }
    },
    resetOrgReducer(state) {
      state.createOrg = {
        name: '',
        description: '',
      }
      state.joinOrg = {
        code: '',
      }
    },
  },
})

export const { createOrgReducer, joinOrgReducer, resetOrgReducer } = orgInfoSlice.actions

export default orgInfoSlice.reducer
