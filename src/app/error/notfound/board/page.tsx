'use client'

import { useRouter } from 'next/navigation'

import { ROUTE_BOARD } from '@/app/constant/route/route-constant'

export default function NotFoundPostingDetail() {
  const router = useRouter()
  const handleClick = () => {
    router.push(ROUTE_BOARD)
  }
  return (
    <div className="grid h-screen px-4 place-content-center">
      <h1 className="tracking-widest text-gray-400 font-bold uppercase">
        게시글을 불러오는데 실패했습니다. 게시판으로 돌아갑니다.
      </h1>
      <button
        type="button"
        className=" mt-5 text-medium font-bold bg-gray-500 text-white hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
        onClick={handleClick}
      >
        게시판으로
      </button>
    </div>
  )
}
