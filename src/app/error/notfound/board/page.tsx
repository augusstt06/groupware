'use client'

import { useRouter } from 'next/navigation'

import Button from '@/app/component/ui/button/Button'
import { ROUTE_BOARD } from '@/app/constant/route/route-constant'

export default function NotFoundPostingDetail() {
  const router = useRouter()
  const handleClick = () => {
    router.push(ROUTE_BOARD)
  }
  return (
    <div className="grid h-screen px-4 place-content-center">
      <h1 className="tracking-widest text-gray-600 dark:text-gray-400 font-bold uppercase">
        게시글을 불러오는데 실패했습니다. 게시판으로 돌아갑니다.
      </h1>
      <Button
        buttonContent={'게시판으로'}
        className=" mt-5 font-bold bg-gray-500 text-white hover:text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
        onClick={handleClick}
      />
    </div>
  )
}
