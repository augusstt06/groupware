'use client'

import { configureStore } from '@reduxjs/toolkit'

import loginInfoReducer from './reducers/loginInfoReducer'
import orgInfoReducer from './reducers/orgInfoReducer'

export const store = configureStore({
  reducer: {
    loginInfo: loginInfoReducer,
    orgInfo: orgInfoReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
