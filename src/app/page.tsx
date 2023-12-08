'use client'

import { useEffect } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { NavigationBtn } from './component/ui/button/BtnGroups'
import { COMPLETE, KEY_ACCESS_TOKEN, KEY_ORGANIZATION } from './constant/constant'
import { ERR_COOKIE_NOT_FOUND } from './constant/errorMsg'
import { moduleDeleteCookies, moduleGetCookie } from './module/utils/cookie'

export default function Home() {
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const orgCookie = moduleGetCookie(KEY_ORGANIZATION)
  const isLogin = accessToken !== ERR_COOKIE_NOT_FOUND && orgCookie === COMPLETE
  const router = useRouter()

  useEffect(() => {
    if (accessToken !== ERR_COOKIE_NOT_FOUND && orgCookie !== COMPLETE) {
      moduleDeleteCookies(KEY_ACCESS_TOKEN)
    } else if (accessToken === ERR_COOKIE_NOT_FOUND && orgCookie === COMPLETE) {
      moduleDeleteCookies(KEY_ORGANIZATION)
    }

    if (isLogin) {
      router.push('/main')
    }
  }, [accessToken])

  return (
    <main className="flex flex-col justify-center items-center h-4/5 ">
      <div className="flex flex-col justify-center items-center mb-10 mt-20 ">
        <div className="text-xl font-bold mb-6">
          Easily collaborate with your team from anywhere
        </div>
        <div className="text-medium font-semibold">other comments...</div>
      </div>
      <div className="flex flex-col justify-around items-center h-2/4 mb-10">
        <Link href="/signup">
          <NavigationBtn title="회원가입" />
        </Link>
        <div className="text-medium font-normal mt-8 mb-3">If you already have an account,</div>
        <Link href="/login">
          <NavigationBtn title="로그인" />
        </Link>
      </div>
    </main>
  )
}
