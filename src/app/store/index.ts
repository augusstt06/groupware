'use client'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

import { boardCategorySlice } from './reducers/board/boardCategoryReducer'
import { boardLikeSlice } from './reducers/board/boardLikeReducer'
import { openBoardWriteModalSlice } from './reducers/board/openBoardWriteModalReducer'
import { loginInfoSlice } from './reducers/login/loginInfoReducer'
import { orgInfoSlice } from './reducers/login/orgInfoReducer'
import { signupInfoSlice } from './reducers/login/signupInfoReducer'
import { userInfoSlice } from './reducers/main/userInfoReducer'
import { maintainSlice } from './reducers/maintain/maintainReducer'
import { projectDeatilCategorySlice } from './reducers/project/projectDetailCategoryReducer'
import { projectIssueSlice } from './reducers/project/projectIssueReducer'
import { projectMainCategorySlice } from './reducers/project/projectMainCategoryReducer'
import { projectModalSlice } from './reducers/project/projectModalReducer'
import { settingModalSlice } from './reducers/setting/settingModalReducer'
import { teamModalSlice } from './reducers/team/teamModalReducer'

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
  boardCategory: boardCategorySlice.reducer,
  openBoardWriteModal: openBoardWriteModalSlice.reducer,
  boardLike: boardLikeSlice.reducer,
  projectModal: projectModalSlice.reducer,
  projectMainCategory: projectMainCategorySlice.reducer,
  projectIssue: projectIssueSlice.reducer,
  projectDetailCategory: projectDeatilCategorySlice.reducer,
  teamModal: teamModalSlice.reducer,
  settingModal: settingModalSlice.reducer,
})
const persistConfig = {
  key: 'root',
  storage,
  whiteList: [
    'userInfo',
    'maintain',
    'boardCategory',
    'openBoardWriteModal',
    'boardLike',
    'projectModal',
    'projectMainCategory',
    'projectIssue',
    'projectDetailCategory',
    'teamModal',
    'settingModal',
  ],
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
