'use client'

import { useRouter } from 'next/navigation'

import Button from '@/_components/button/Button'
import { ROUTE_LOGIN } from '@/_constant/route/route-constant'

export default function NotfoundAccessTokenInSignup() {
  const router = useRouter()
  const handleClick = () => {
    router.push(ROUTE_LOGIN)
  }

  return (
    <div className="h-screen px-4 grid place-content-center">
      <h1 className="font-bold tracking-widest text-gray-600 uppercase dark:text-gray-400">
        회원가입/로그인을 먼저 진행해 주세요.
      </h1>
      <Button
        buttonContent="로그인 화면으로"
        className=" mt-5 font-bold bg-gray-500 text-white hover:text-white focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
        onClick={handleClick}
      />
    </div>
  )
}
