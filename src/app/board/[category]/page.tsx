'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import BoardHub from '@/app/component/page/main/hub/board/BoardHub'
import BoardWriteModal from '@/app/component/ui/modal/BoardWriteModal'
import Sidebar from '@/app/component/ui/sidebar/Sidebar'
import { BOARD, KEY_ACCESS_TOKEN, KEY_LOGIN_COMPLETE } from '@/app/constant/constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleCheckUserState } from '@/app/module/utils/moduleCheckUserState'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { categoryReduer } from '@/app/store/reducers/board/boardCategoryReducer'
import { openBoardWriteModalReducer } from '@/app/store/reducers/board/openBoardWriteModalReducer'
import { type ModuleCheckUserStateProps } from '@/app/types/moduleTypes'
import { type PageParam } from '@/app/types/pageTypes'

export default function BoardCategory({ params }: { params: PageParam }) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])
  const isModalOpen = useAppSelector((state) => state.openBoardWriteModal.isOpen)
  const handleModal = () => {
    dispatch(openBoardWriteModalReducer())
  }

  useEffect(() => {
    dispatch(categoryReduer(params.category))
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
        <BoardHub />
        {isModalOpen ? <BoardWriteModal onClick={handleModal} /> : <></>}
      </div>
    </main>
  )
}
