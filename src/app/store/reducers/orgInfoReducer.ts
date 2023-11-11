import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type State = {
  createOrg: {
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
  },
})

export const { createOrgReducer } = orgInfoReducer.actions

export default orgInfoReducer.reducer
