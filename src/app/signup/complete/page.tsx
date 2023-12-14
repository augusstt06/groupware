'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { KEY_ACCESS_TOKEN, KEY_ORGANIZATION } from '@/app/constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '@/app/constant/errorMsg'
import {
  ROUTE_ERR_NOT_FOUND_ORG_TOKEN,
  ROUTE_LOGIN,
  ROUTE_MAIN,
} from '@/app/constant/route-constant'
import { useAppDispatch } from '@/app/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/app/module/utils/cookie'
import { resetOrgReducer } from '@/app/store/reducers/login/orgInfoReducer'

export default function SignupComplete() {
  const router = useRouter()
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const orgToken = moduleGetCookie(KEY_ORGANIZATION)
  const dispatch = useAppDispatch()

  const handleClick = () => {
    router.push(ROUTE_LOGIN)
  }

  useEffect(() => {
    if (accessToken !== ERR_COOKIE_NOT_FOUND) {
      if (orgToken === ERR_COOKIE_NOT_FOUND) {
        router.push(ROUTE_ERR_NOT_FOUND_ORG_TOKEN)
      } else {
        router.push(ROUTE_MAIN)
      }
      return
    }

    dispatch(resetOrgReducer())
  })
  return (
    <div className="grid h-screen px-4 place-content-center">
      <h1 className="mb-3 md:text-xl text-medium tracking-widest text-white  uppercase text-center">
        조직 생성/가입이 완료되었습니다.
      </h1>
      <h1 className="mb-3 md:text-xl text-medium tracking-widest text-white uppercase text-center">
        로그인 이후 서비스를 이용해 주세요.
      </h1>

      <button
        type="button"
        className="mt-5 text-medium font-bold text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white bg-white border-indigo-500 hover:bg-indigo-500 focus:ring-4 focus:outline-none dark:hover:bg-white dark:hover:text-indigo-500 focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={handleClick}
      >
        로그인
      </button>
    </div>
  )
}
