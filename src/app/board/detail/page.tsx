'use client'
// 상세페이지
import { useEffect, useState } from 'react'

import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

import Sidebar from '@/app/component/ui/sidebar/Sidebar'
import { BOARD, KEY_ACCESS_TOKEN, KEY_LOGIN_COMPLETE } from '@/app/constant/constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleCheckUserState } from '@/app/module/utils/moduleCheckUserState'
import { moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { type ModuleCheckUserStateProps } from '@/app/types/moduleTypes'

const Viewbox = dynamic(async () => import('../../component/ui/editor/TextViewer'), {
  ssr: false,
})
export default function BoardDetail() {
  // 추후 content reponse 받은것을 바탕으로 Viewer의 props로 넘기기
  const router = useRouter()
  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const loginCOmpleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])
  useEffect(() => {
    const moduleProps: ModuleCheckUserStateProps = {
      useRouter: router,
      token: accessToken,
      setToken: setAccessToken,
      completeState: loginCOmpleteState,
      isCheckInterval: true,
    }
    moduleCheckUserState(moduleProps)
  }, [])
  return (
    <main className="w-full grid gap-4 grid-cols-4 h-4/5 pt-10 md:ml-10 md:mr-10 ml-5 z-1">
      <Sidebar title={BOARD} />
      <div className="md:col-span-3 mr-10 col-span-4">
        <Viewbox />
      </div>
    </main>
  )
}
