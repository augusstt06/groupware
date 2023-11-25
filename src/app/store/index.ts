'use client'

import { configureStore } from '@reduxjs/toolkit'

import attendanceTimeReducer from './reducers/attendanceTimeReducer'
import loginInfoReducer from './reducers/loginInfoReducer'
import orgInfoReducer from './reducers/orgInfoReducer'
import signupInfoReducer from './reducers/signupInfoReducer'

export const store = configureStore({
  reducer: {
    signupInfo: signupInfoReducer,
    loginInfo: loginInfoReducer,
    orgInfo: orgInfoReducer,
    attendanceTime: attendanceTimeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
