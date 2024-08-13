'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import SettingModal from '@/components/modal/setting/SettingModal'
import { KEY_LOGIN_COMPLETE } from '@/constant/constant'
import { useAppDispatch, useAppSelector } from '@/module/hooks/reduxHooks'
import { createAccessTokenManager } from '@/module/utils/token'
import { validateUserState } from '@/module/utils/validate'
import { handleSettingModalReducer } from '@/store/reducers/setting/settingModalReducer'
import { type ReactProps } from '@/types/pageType'

export default function ProjetLayout({ children }: ReactProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { getAccessToken, refreshToken } = createAccessTokenManager
  const isSettingOpen = useAppSelector((state) => state.settingModal.isOpen)
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])

  useEffect(() => {
    if (isSettingOpen) dispatch(handleSettingModalReducer())
  }, [])
  useEffect(() => {
    void refreshToken()
    validateUserState({ loginCompleteState, router })
  }, [getAccessToken()])

  return (
    <>
      {children}
      {isSettingOpen ? <SettingModal /> : <></>}
    </>
  )
}
