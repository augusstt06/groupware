import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type State = {
  attendanceTime: number | null
  elapsed: number
}

const initialState: State = {
  attendanceTime: 0,
  elapsed: 0,
}

export const attendanceTimeReducer = createSlice({
  name: 'attendanceTimeReducer',
  initialState,
  reducers: {
    checkAttendanceTimeReducer(state, action: PayloadAction<{ attendanceTime: number }>) {
      state.attendanceTime = action.payload.attendanceTime
    },
    updateElapsedReducer(state, action: PayloadAction<{ elapsed: number }>) {
      state.elapsed = action.payload.elapsed
    },
  },
})

export const { checkAttendanceTimeReducer, updateElapsedReducer } = attendanceTimeReducer.actions
export default attendanceTimeReducer.reducer
