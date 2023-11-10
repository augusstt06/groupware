import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type State = {
  createOrg: {
    name: string
    description: string
    type: string
  }
}

const initialState: State = {
  createOrg: {
    name: '',
    description: '',
    type: 'public',
  },
}

export const orgInfoReducer = createSlice({
  name: 'orgInfoReducer',
  initialState,
  reducers: {
    createOrgReducer(
      state,
      action: PayloadAction<{ name: string; description: string; type: string }>,
    ) {
      state.createOrg.name = action.payload.name
      state.createOrg.description = action.payload.description
      state.createOrg.type = action.payload.type
    },
  },
})

export const { createOrgReducer } = orgInfoReducer.actions

export default orgInfoReducer.reducer
