'use client'
import { useRouter } from 'next/navigation'

export default function RequestFail() {
  const router = useRouter()
  const handleClick = () => {
    router.push('/login')
  }
  return (
    <div className="grid h-screen px-4 bg-white place-content-center">
      <h1 className="tracking-widest text-gray-500 uppercase">
        Login request failed. Please Login again.
      </h1>
      <button
        type="button"
        className=" mt-5 text-medium bg-gray-500 text-white hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
        onClick={handleClick}
      >
        Login
      </button>
    </div>
  )
}
