'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import MainHub from '../component/page/main/hub/MainHub'
import Sidebar from '../component/ui/sidebar/Sidebar'
import { BOARD, KEY_ACCESS_TOKEN, KEY_LOGIN_COMPLETE, TRUE } from '../constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '../constant/errorMsg'
import {
  ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN,
  ROUTE_ERR_NOT_FOUND_ORG_TOKEN,
} from '../constant/route-constant'
import { useAppSelector } from '../module/hooks/reduxHooks'
import { moduleDeleteCookies, moduleGetCookie } from '../module/utils/cookie'

export default function Board() {
  const router = useRouter()
  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])

  /**
   * TODO: 접근 제한사항
   * 1. 로그인 여부
   * 2. 조직은 물어봐야함
   */
  useEffect(() => {
    if (accessToken === ERR_COOKIE_NOT_FOUND) {
      router.push(ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN)
      return
    }
    if (loginCompleteState !== TRUE) {
      router.push(ROUTE_ERR_NOT_FOUND_ORG_TOKEN)
      return
    }
    let newAccessToken
    const checkAccessToken = () => {
      newAccessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
      if (newAccessToken === ERR_COOKIE_NOT_FOUND) {
        moduleDeleteCookies(KEY_ACCESS_TOKEN)
        router.push(ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN)
      } else if (newAccessToken !== accessToken) {
        setAccessToken(newAccessToken)
      }
    }
    const intervalid = setInterval(checkAccessToken, 500)

    return () => {
      clearInterval(intervalid)
    }
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
