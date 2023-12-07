'use client'
import { useRouter } from 'next/navigation'

export default function RequestFailtoFindOrg() {
  const router = useRouter()
  const handleClick = () => {
    router.push('/signup/registerorg')
  }
  return (
    <div className="grid h-screen px-4 bg-white place-content-center">
      <h1 className="tracking-widest text-gray-500 uppercase">
        아직 조직에 생성/가입하지 않았습니다.
      </h1>
      <button
        type="button"
        className=" mt-5 text-medium bg-gray-500 text-white hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
        onClick={handleClick}
      >
        조직생성 / 가입
      </button>
    </div>
  )
}
