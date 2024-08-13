'use client'

import { useEffect } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import BoardWriteModal from './_childs/modal/BoardWriteModal'

import SettingModal from '@/components/modal/setting/SettingModal'
import { KEY_LOGIN_COMPLETE } from '@/constant/constant'
import { useAppDispatch, useAppSelector } from '@/module/hooks/reduxHooks'
import { createAccessTokenManager } from '@/module/utils/token'
import { validateUserState } from '@/module/utils/validate'
import { handleSettingModalReducer } from '@/store/reducers/setting/settingModalReducer'
import { type ReactProps } from '@/types/pageType'

export default function BoardLayout({ children }: ReactProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { getAccessToken, refreshToken } = createAccessTokenManager
  const query = useSearchParams().get('name')
  const isSettingOpen = useAppSelector((state) => state.settingModal.isOpen)

  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])

  const currentBoard = useAppSelector((state) => state.boardCategory.myBoard).filter(
    (data) => data.name === query,
  )[0]
  const isModalOpen = useAppSelector((state) => state.openBoardWriteModal.isOpen)
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
      {isModalOpen ? <BoardWriteModal currentBoard={currentBoard} /> : <></>}
      {isSettingOpen ? <SettingModal /> : null}
    </>
  )
}
