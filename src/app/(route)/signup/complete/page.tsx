'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { KEY_ACCESS_TOKEN, KEY_LOGIN_COMPLETE, TRUE } from '@/constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '@/constant/errorMsg'
import {
  ROUTE_ERR_NOT_FOUND_ORG_TOKEN,
  ROUTE_LOGIN,
  ROUTE_MAIN,
} from '@/constant/route/route-constant'
import { useAppDispatch, useAppSelector } from '@/module/hooks/reduxHooks'
import { moduleGetCookie } from '@/module/utils/moduleCookie'
import { resetOrgReducer } from '@/store/reducers/login/orgInfoReducer'

export default function SignupComplete() {
  const router = useRouter()
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])
  const dispatch = useAppDispatch()

  const handleClick = () => {
    router.push(ROUTE_LOGIN)
  }

  useEffect(() => {
    if (accessToken !== ERR_COOKIE_NOT_FOUND) {
      if (loginCompleteState !== TRUE) {
        router.push(ROUTE_ERR_NOT_FOUND_ORG_TOKEN)
      } else {
        router.push(ROUTE_MAIN)
      }
      return
    }

    dispatch(resetOrgReducer())
  })
  return (
    <div className="h-screen px-4 grid place-content-center">
      <h1 className="mb-3 tracking-widest text-center text-white uppercase md:text-xl text-medium ">
        조직 생성/가입이 완료되었습니다.
      </h1>
      <h1 className="mb-3 tracking-widest text-center text-white uppercase md:text-xl text-medium">
        로그인 이후 서비스를 이용해 주세요.
      </h1>

      <button
        type="button"
        className="mt-5 text-medium text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white bg-white border-indigo-500 hover:bg-indigo-500 focus:ring-4 focus:outline-none dark:hover:bg-white dark:hover:text-indigo-500 focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={handleClick}
      >
        로그인
      </button>
    </div>
  )
}
