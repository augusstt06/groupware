'use client'
import { useEffect } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AiOutlineMail } from 'react-icons/ai'

import { Label } from '@/components/label/Label'
import { KEY_ACCESS_TOKEN, LABEL, LABEL_ICON, REGISTER_EMAIL } from '@/constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '@/constant/errorMsg'
import { ROUTE_LOGIN, ROUTE_MAIN } from '@/constant/route/route-constant'
import useInput from '@/module/hooks/reactHooks/useInput'
import { moduleGetCookie } from '@/module/utils/moduleCookie'
import { type UseInputProps } from '@/types/module'

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
    <div className="sort-vertical-flex place-content-center justify-center h-screen px-4">
      <div className="sort-vertical-flex justify-center mb-5">
        <div className="mb-6 text-xl font-bold">비밀번호 찾기</div>
        <div className="text-sm">회원정보의 이메일로 비밀번호 재설정 메일이 발송됩니다.</div>
      </div>
      <div className="md:w-2/5 w-4/5 mt-3">
        <div className="w-full">
          <Label category={LABEL} childs={REGISTER_EMAIL} />
          <div className="relative flex mt-2 mb-6">
            <Label category={LABEL_ICON} childs={<AiOutlineMail />} />
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
      <div className="hover:text-gray-200 text-sm text-gray-400">
        <Link href={ROUTE_LOGIN}>메인으로</Link>
      </div>
    </div>
  )
}
