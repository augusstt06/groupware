'use client'
import { useRouter } from 'next/navigation'

import Button from '@/_components/button/Button'
import { ROUTE_SIGNUP_ORG } from '@/_constant/route/route-constant'

export default function NotFoundOrg() {
  const router = useRouter()
  const handleClick = () => {
    router.push(ROUTE_SIGNUP_ORG)
  }
  return (
    <div className="h-screen px-4 grid place-content-center">
      <h1 className="font-bold tracking-widest text-gray-600 uppercase dark:text-gray-400">
        아직 조직에 생성/가입하지 않은 유저입니다.
      </h1>
      <Button
        buttonContent="조직생성 / 가입"
        className=" mt-5 font-bold bg-gray-500 text-white hover:text-white focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
        onClick={handleClick}
      />
    </div>
  )
}
