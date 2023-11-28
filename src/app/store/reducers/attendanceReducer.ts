import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type State = {
  status: boolean
  time: number
}

const initialState: State = {
  status: false,
  time: 0,
}

export const attendanceSlice = createSlice({
  name: 'attendanceSlice',
  initialState,
  reducers: {
    checkAttendanceReducer(state, action: PayloadAction<{ status: boolean; time: number }>) {
      state = { ...action.payload }
    },
  },
})

export const { checkAttendanceReducer } = attendanceSlice.actions
export default attendanceSlice.reducer
