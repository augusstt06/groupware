import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type State = {
  category: string
  description: string
  endAt: string
  processState: string
  projectId: number
  startAt: string
  title: string
}

const initialState: State = {
  category: '',
  description: '',
  endAt: '',
  processState: '',
  projectId: 0,
  startAt: '',
  title: '',
}

export const projectIssueSlice = createSlice({
  name: 'projectIssueSlice',
  initialState,
  reducers: {
    changeIssueCategoryReducer(state, action: PayloadAction<string>) {
      state.category = action.payload
    },
    changeIssueDescriptionReducer(state, action: PayloadAction<string>) {
      state.description = action.payload
    },
    changeIssueProcessStateReducer(state, action: PayloadAction<string>) {
      state.processState = action.payload
    },
    changeIssueTitleReducer(state, action: PayloadAction<string>) {
      state.title = action.payload
    },
    changeIssueStartAtReducer(state, action: PayloadAction<string>) {
      state.startAt = action.payload
    },
    changeIssueEndAtReducer(state, action: PayloadAction<string>) {
      state.endAt = action.payload
    },
    changeIssueProjectIdReducer(state, action: PayloadAction<number>) {
      state.projectId = action.payload
    },
    resetIssueReducer(state) {
      state.category = ''
      state.description = ''
      state.endAt = ''
      state.processState = ''
      state.startAt = ''
      state.title = ''
    },
  },
})

export const {
  changeIssueCategoryReducer,
  changeIssueDescriptionReducer,
  changeIssueEndAtReducer,
  changeIssueProcessStateReducer,
  changeIssueProjectIdReducer,
  changeIssueStartAtReducer,
  changeIssueTitleReducer,
  resetIssueReducer,
} = projectIssueSlice.actions
export default projectIssueSlice.reducer
