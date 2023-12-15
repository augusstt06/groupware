'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import MainHub from '../component/page/main/hub/MainHub'
import Sidebar from '../component/ui/sidebar/Sidebar'
import { BOARD, KEY_ACCESS_TOKEN, KEY_LOGIN_COMPLETE } from '../constant/constant'
import { useAppSelector } from '../module/hooks/reduxHooks'
import { moduleCheckUserState } from '../module/utils/moduleCheckUserState'
import { moduleGetCookie } from '../module/utils/moduleCookie'
import { type ModuleCheckUserStateProps } from '../types/moduleTypes'

export default function Board() {
  const router = useRouter()
  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])

  useEffect(() => {
    const moduleProps: ModuleCheckUserStateProps = {
      useRouter: router,
      token: accessToken,
      setToken: setAccessToken,
      completeState: loginCompleteState,
      isCheckInterval: false,
    }
    moduleCheckUserState(moduleProps)
  })
  return (
    <main className="w-full grid gap-4 grid-cols-4 h-4/5 pt-10 md:ml-10 md:mr-10 ml-5 z-1">
      <Sidebar title={BOARD} />
      <div className="md:col-span-3 mr-10 col-span-4">
        <MainHub title="게시판" />
      </div>
    </main>
  )
}
