'use client'
import { useEffect } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AiOutlineMail } from 'react-icons/ai'

import { InputIconlabel } from '@/app/component/ui/label/InputIconlabel'
import { InputLabel } from '@/app/component/ui/label/Inputlabel'
import { KEY_ACCESS_TOKEN, REGISTER_EMAIL } from '@/app/constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '@/app/constant/errorMsg'
import { ROUTE_LOGIN, ROUTE_MAIN } from '@/app/constant/route-constant'
import useInput from '@/app/module/hooks/reactHooks/useInput'
import { moduleGetCookie } from '@/app/module/utils/cookie'
import { type UseInputProps } from '@/app/types/moduleTypes'

export default function FindPwd() {
  const router = useRouter()
  const emailInput: UseInputProps = useInput('', REGISTER_EMAIL)
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)

  useEffect(() => {
    if (accessToken !== ERR_COOKIE_NOT_FOUND) {
      router.push(ROUTE_MAIN)
    }
  }, [])
  return (
    <div className="flex flex-col justify-center items-center h-screen px-4 place-content-center">
      <div className="flex flex-col justify-center items-center mb-5">
        <div className="text-xl font-bold mb-6">비밀번호 찾기</div>
        <div className="text-sm">회원정보의 이메일로 비밀번호 재설정 메일이 발송됩니다.</div>
      </div>
      <div className="md:w-2/5 w-4/5 mt-3">
        <div className="w-full">
          <InputLabel title="이메일" />
          <div className="flex relative mt-2 mb-6">
            <InputIconlabel icon={<AiOutlineMail />} />
            <input
              type="text"
              value={emailInput.value}
              onChange={emailInput.onChange}
              id={REGISTER_EMAIL}
              className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="abc@sample.com"
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        className="text-white justify-center bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
      >
        발송하기
      </button>
      <div className="text-sm text-gray-400 hover:text-gray-200">
        <Link href={ROUTE_LOGIN}>메인으로</Link>
      </div>
    </div>
  )
}
