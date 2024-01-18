import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { KEY_ATTENDANCE, KEY_UUID, KEY_X_ORGANIZATION_CODE } from '@/app/constant/constant'

type State = {
  [KEY_X_ORGANIZATION_CODE]: string
  [KEY_UUID]: string
  [KEY_ATTENDANCE]: {
    status: string
    time: number
  }
  extraInfo: Record<string, string | number>
}

const initialState: State = {
  [KEY_X_ORGANIZATION_CODE]: '',
  [KEY_UUID]: '',
  [KEY_ATTENDANCE]: {
    status: 'out',
    time: 0,
  },
  extraInfo: { name: '', position: '', userId: 0, organizationId: 0, organizationName: '' },
}

export const userInfoSlice = createSlice({
  name: 'userInfoSlice',
  initialState,
  reducers: {
    updateUserInfoReducer(
      state,
      action: PayloadAction<{ [KEY_X_ORGANIZATION_CODE]: string; [KEY_UUID]: string }>,
    ) {
      const { [KEY_X_ORGANIZATION_CODE]: orgCode, [KEY_UUID]: uuid } = action.payload
      state[KEY_X_ORGANIZATION_CODE] = orgCode
      state[KEY_UUID] = uuid
    },
    updateAttendanceStatusReducer(
      state,
      action: PayloadAction<{
        status: string
        time: number
      }>,
    ) {
      state[KEY_ATTENDANCE].status = action.payload.status
      state[KEY_ATTENDANCE].time = action.payload.time
    },
    updateExtraUserInfoReducer(state, action: PayloadAction<Record<string, string | number>>) {
      state.extraInfo = { ...action.payload }
    },
    resetUserInfoReducer(state) {
      state[KEY_X_ORGANIZATION_CODE] = ''
      state[KEY_UUID] = ''
      state.extraInfo = {
        name: '',
        position: '',
        userId: 0,
        organizationId: 0,
        organizationName: '',
      }
    },
  },
})

export const {
  updateUserInfoReducer,
  updateAttendanceStatusReducer,
  updateExtraUserInfoReducer,
  resetUserInfoReducer,
} = userInfoSlice.actions
export default userInfoSlice.reducer
