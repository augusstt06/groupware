'use client'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'

import loginInfoReducer from './reducers/login/loginInfoReducer'
import orgInfoReducer from './reducers/login/orgInfoReducer'
import signupInfoReducer from './reducers/login/signupInfoReducer'
import userInfoReducer from './reducers/main/userInfoReducer'

/**
 * redux-persist 설치 이후에 모듈을 찾지 못하는 에러 발생
 * 1. next-env.d.ts 에 redux persist를 추가하여 타입스크립트 컴파일러가 모듈을 가져오도록 설정
 * 2. 실패 : 빌드시에 초기화됨
 * 3. redux-persist.d.ts 생성후 tsconfig.json에 추가 => 성공
 */
const rootReducer = combineReducers({
  signupInfo: signupInfoReducer,
  loginInfo: loginInfoReducer,
  orgInfo: orgInfoReducer,
  userInfo: userInfoReducer,
})
const persistConfig = {
  key: 'root',
  storage,
  whiteList: [],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
