'use client'

import { useRouter } from 'next/navigation'

export default function NotfoundAccessToken() {
  const router = useRouter()
  const handleClick = () => {
    router.push('/')
  }
  return (
    <div className="grid h-screen px-4 bg-gray-900 place-content-center">
      <h1 className="tracking-widest text-gray-400 font-bold uppercase">로그인 후 이용해주세요</h1>
      <button
        type="button"
        className=" mt-5 text-medium font-bold bg-gray-500 text-white hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
        onClick={handleClick}
      >
        메인으로
      </button>
    </div>
  )
}
