'use client'
import { useRouter } from 'next/navigation'

import Button from '@/_component/button/Button'
import { ROUTE_SIGNUP_ORG } from '@/constant/route/route-constant'

export default function NotFoundOrg() {
  const router = useRouter()
  const handleClick = () => {
    router.push(ROUTE_SIGNUP_ORG)
  }
  return (
    <div className="grid h-screen px-4 place-content-center">
      <h1 className="tracking-widest text-gray-600 dark:text-gray-400 font-bold uppercase">
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
