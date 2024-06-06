'use client'

import { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import BoardWriteModal from './_childs/modal/BoardWriteModal'

import SettingModal from '@/components/modal/setting/SettingModal'
import { KEY_ACCESS_TOKEN, KEY_LOGIN_COMPLETE } from '@/constant/constant'
import { useAppDispatch, useAppSelector } from '@/module/hooks/reduxHooks'
import { moduleCheckUserState } from '@/module/utils/check/moduleCheckUserState'
import {
  checkTokenExpired,
  moduleDecodeToken,
  moduleGetCookie,
  moduleRefreshToken,
} from '@/module/utils/moduleCookie'
import { handleSettingModalReducer } from '@/store/reducers/setting/settingModalReducer'
import { type CustomDecodeTokenType } from '@/types/module'
import { type ReactProps } from '@/types/pageType'

export default function BoardLayout({ children }: ReactProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const query = useSearchParams().get('name')
  const isSettingOpen = useAppSelector((state) => state.settingModal.isOpen)
  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const decodeToken = moduleDecodeToken(accessToken)

  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])

  const currentBoard = useAppSelector((state) => state.boardCategory.myBoard).filter(
    (data) => data.name === query,
  )[0]

  const isModalOpen = useAppSelector((state) => state.openBoardWriteModal.isOpen)
  useEffect(() => {
    if (isSettingOpen) dispatch(handleSettingModalReducer())
  }, [])
  useEffect(() => {
    const accessTokenTime = Number((decodeToken as CustomDecodeTokenType).exp)
    const isTokenExist: boolean = checkTokenExpired(accessTokenTime)
    if (isTokenExist) {
      void moduleRefreshToken(accessToken)
    }
    moduleCheckUserState({ loginCompleteState, router, accessToken, setAccessToken })
  }, [accessToken])
  return (
    <>
      {children}
      {isModalOpen ? <BoardWriteModal currentBoard={currentBoard} /> : <></>}
      {isSettingOpen ? <SettingModal /> : null}
    </>
  )
}
