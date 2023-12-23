'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import MainHub from '../component/page/main/hub/MainHub'
import BoardWriteModal from '../component/ui/modal/BoardWriteModal'
import Sidebar from '../component/ui/sidebar/Sidebar'
import { BOARD, KEY_ACCESS_TOKEN, KEY_LOGIN_COMPLETE } from '../constant/constant'
import { useAppDispatch, useAppSelector } from '../module/hooks/reduxHooks'
import { moduleCheckUserState } from '../module/utils/moduleCheckUserState'
import {
  checkTokenExpired,
  moduleDecodeToken,
  moduleGetCookie,
  moduleRefreshToken,
} from '../module/utils/moduleCookie'
import { categoryReduer } from '../store/reducers/board/boardCategoryReducer'
import { openBoardWriteModalReducer } from '../store/reducers/board/openBoardWriteModalReducer'
import { type CustomDecodeTokenType, type ModuleCheckUserStateProps } from '../types/moduleTypes'

export default function Board() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const decodeToken = moduleDecodeToken(accessToken)
  const accessTokenTime = Number((decodeToken as CustomDecodeTokenType).exp)
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])

  const isModalOpen = useAppSelector((state) => state.openBoardWriteModal.isOpen)
  const handleModal = () => {
    dispatch(openBoardWriteModalReducer())
  }
  useEffect(() => {
    dispatch(categoryReduer(''))
    if (checkTokenExpired(accessTokenTime)) {
      void moduleRefreshToken(accessToken)
    }
    const moduleProps: ModuleCheckUserStateProps = {
      useRouter: router,
      token: accessToken,
      setToken: setAccessToken,
      completeState: loginCompleteState,
      isCheckInterval: true,
    }
    moduleCheckUserState(moduleProps)
  }, [])
  return (
    <main className="w-full grid gap-4 grid-cols-4 h-4/5 pt-10 md:ml-10 md:mr-10 ml-5 z-1">
      <Sidebar title={BOARD} />
      <div className="md:col-span-3 mr-10 col-span-4">
        <MainHub title="게시판" />
        {isModalOpen ? <BoardWriteModal onClick={handleModal} /> : <></>}
      </div>
    </main>
  )
}
