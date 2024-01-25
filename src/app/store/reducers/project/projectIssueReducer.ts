import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type State = {
  category: string
  description: string
  endAt: string
  endAtTime: {
    hour: string
    minute: string
  }
  processState: string
  projectId: number
  startAt: string
  startAtTime: {
    hour: string
    minute: string
  }
  title: string
}

const initialState: State = {
  category: '',
  description: '',
  endAt: '',
  endAtTime: {
    hour: '00',
    minute: '00',
  },
  processState: '',
  projectId: 0,
  startAt: '',
  startAtTime: {
    hour: '00',
    minute: '00',
  },
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
    changeIssueStartAtTimeReducer(
      state,
      action: PayloadAction<{ units: 'hour' | 'minute'; timeValue: string }>,
    ) {
      if (action.payload.units === 'hour') {
        state.startAtTime.hour = action.payload.timeValue
      } else state.startAtTime.minute = action.payload.timeValue
    },
    changeIssueEndAtReducer(state, action: PayloadAction<string>) {
      state.endAt = action.payload
    },
    changeIssueEndAtTimeReducer(
      state,
      action: PayloadAction<{ units: 'hour' | 'minute'; timeValue: string }>,
    ) {
      if (action.payload.units === 'hour') {
        state.endAtTime.hour = action.payload.timeValue
      } else state.endAtTime.minute = action.payload.timeValue
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
      state.endAtTime = {
        hour: '00',
        minute: '00',
      }
      state.startAtTime = {
        hour: '00',
        minute: '00',
      }
    },
  },
})

export const {
  changeIssueCategoryReducer,
  changeIssueDescriptionReducer,
  changeIssueEndAtReducer,
  changeIssueEndAtTimeReducer,
  changeIssueProcessStateReducer,
  changeIssueProjectIdReducer,
  changeIssueStartAtReducer,
  changeIssueStartAtTimeReducer,
  changeIssueTitleReducer,
  resetIssueReducer,
} = projectIssueSlice.actions
export default projectIssueSlice.reducer
