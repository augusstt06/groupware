'use client'

import { useRouter } from 'next/navigation'

import { ROUTE_LOGIN } from '@/app/constant/route/route-constant'

export default function NotfoundAccessTokenInSignup() {
  const router = useRouter()
  const handleClick = () => {
    router.push(ROUTE_LOGIN)
  }

  return (
    <div className="grid h-screen px-4 place-content-center">
      <h1 className="tracking-widest text-gray-600 dark:text-gray-400 font-bold uppercase">
        회원가입/로그인을 먼저 진행해 주세요.
      </h1>
      <button
        type="button"
        className=" mt-5 text-medium font-bold bg-gray-500 text-white hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
        onClick={handleClick}
      >
        로그인 화면으로
      </button>
    </div>
  )
}
