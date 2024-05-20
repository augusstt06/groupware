'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

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

export default function ProjetLayout({ children }: ReactProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const isSettingOpen = useAppSelector((state) => state.settingModal.isOpen)
  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const decodeToken = moduleDecodeToken(accessToken)
  const accessTokenTime = Number((decodeToken as CustomDecodeTokenType).exp)
  const isTokenExist: boolean = checkTokenExpired(accessTokenTime)
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])

  useEffect(() => {
    if (isSettingOpen) dispatch(handleSettingModalReducer())
  }, [])

  useEffect(() => {
    if (isTokenExist) {
      void moduleRefreshToken(accessToken)
    }
    moduleCheckUserState({ loginCompleteState, router, accessToken, setAccessToken })
  }, [accessToken])
  return <>{children}</>
}
