'use client'

import { useEffect } from 'react'

import Link from 'next/link'

import { NavigationBtn } from './component/ui/button/BtnGroups'
import { KEY_ACCESS_TOKEN, KEY_LOGIN, KEY_ORGANIZATION } from './constant/constant'
import { moduleDeleteCookies } from './module/utils/cookie'

export default function Home() {
  useEffect(() => {
    moduleDeleteCookies(KEY_ACCESS_TOKEN, KEY_LOGIN, KEY_ORGANIZATION)
  }, [])

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
