'use client'

import { useRouter } from 'next/navigation'

import { ROUTE_MAIN } from '@/constant/route/route-constant'

export default function AlreadyLogin() {
  const router = useRouter()
  const handleClick = () => {
    router.push(ROUTE_MAIN)
  }
  return (
    <div className="grid h-screen px-4 place-content-center">
      <h1 className="font-bold tracking-widest text-gray-600 uppercase dark:text-gray-400">
        이미 로그인되어 있는 유저입니다.
      </h1>
      <button
        type="button"
        className=" mt-5 text-medium font-bold bg-gray-500 text-white hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
        onClick={handleClick}
      >
        메인으로
      </button>
    </div>
  )
}
