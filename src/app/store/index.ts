'use client'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

import { loginInfoSlice } from './reducers/login/loginInfoReducer'
import { orgInfoSlice } from './reducers/login/orgInfoReducer'
import { signupInfoSlice } from './reducers/login/signupInfoReducer'
import { userInfoSlice } from './reducers/main/userInfoReducer'
import { maintainSlice } from './reducers/maintain/maintainReducer'

const createNoopStorage = () => {
  return {
    async getItem(_key: unknown) {
      return Promise.resolve(null)
    },
    async setItem(_key: unknown, value: unknown) {
      return Promise.resolve(value)
    },
    async removeItem(_key: unknown) {
      return Promise.resolve()
    },
  }
}

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()

const rootReducer = combineReducers({
  signupInfo: signupInfoSlice.reducer,
  loginInfo: loginInfoSlice.reducer,
  orgInfo: orgInfoSlice.reducer,
  userInfo: userInfoSlice.reducer,
  maintain: maintainSlice.reducer,
})
const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['userInfo', 'maintain'],
  blacklist: ['signupInfo', 'loginInfo', 'orgInfo'],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
