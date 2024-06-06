'use client'

import { useRouter } from 'next/navigation'

import Button from '@/components/button/Button'
import { ROUTE_BOARD } from '@/constant/route/route-constant'

export default function NotFoundPostingDetail() {
  const router = useRouter()
  const handleClick = () => {
    router.push(ROUTE_BOARD)
  }
  return (
    <div className="h-screen px-4 grid place-content-center">
      <h1 className="font-bold tracking-widest text-gray-600 uppercase dark:text-gray-400">
        게시글을 불러오는데 실패했습니다. 게시판으로 돌아갑니다.
      </h1>
      <Button
        buttonContent={'게시판으로'}
        className=" mt-5 font-bold bg-gray-500 text-white hover:text-white focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
        onClick={handleClick}
      />
    </div>
  )
}
