'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'

import ErrorAlert from '../component/ui/alert/ErrorAlert'
import LoginBtn from '../component/ui/button/login/LoginBtn'
import LoginInput from '../component/ui/input/login/LoginInput'
import { KEY_LOGIN, KEY_ORGANIZATION, REGISTER_EMAIL, REGISTER_PWD } from '../constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '../constant/errorMsg'
import useInput from '../module/hooks/reactHooks/useInput'
import { moduleDeleteCookies, moduleGetCookie } from '../module/utils/cookie'
import { type UseInputProps } from '../types/moduleTypes'

export default function Login() {
  const [emailInput, pwdInput]: UseInputProps[] = [REGISTER_EMAIL, REGISTER_PWD].map(
    (title: string) => useInput('', title),
  )
  const orgCookie = moduleGetCookie(KEY_ORGANIZATION)
  const loginToken = moduleGetCookie(KEY_LOGIN)
  const [isPwdView, setIsPwdView] = useState(false)

  const [errorState, setErrorState] = useState({
    isError: false,
    description: '',
  })
  const setErrMsg = (errDescripton: string) => {
    setErrorState({
      isError: true,
      description: errDescripton,
    })
  }

  const handleClickError = () => {
    setErrorState({
      isError: !errorState.isError,
      description: errorState.description,
    })
  }

  useEffect(() => {
    if (orgCookie !== ERR_COOKIE_NOT_FOUND) {
      moduleDeleteCookies(KEY_ORGANIZATION)
    }
    if (loginToken !== ERR_COOKIE_NOT_FOUND) {
      moduleDeleteCookies(KEY_LOGIN)
    }
  }, [])
  return (
    <div className="flex flex-col justify-center items-center h-screen px-4 place-content-center">
      <div className="text-xl font-bold mb-6">로그인</div>
      <div className="w-2/5 ">
        <LoginInput
          icon={<AiOutlineMail />}
          title={REGISTER_EMAIL}
          placeholder="abc12@sample.com"
          useInput={emailInput}
          isPwdView={isPwdView}
          setIsPwdView={setIsPwdView}
        />
        <LoginInput
          icon={<RiLockPasswordFill />}
          title={REGISTER_PWD}
          placeholder="At least 8 characters"
          useInput={pwdInput}
          isPwdView={isPwdView}
          setIsPwdView={setIsPwdView}
        />
        {errorState.isError ? (
          <ErrorAlert description={errorState.description} handleClickError={handleClickError} />
        ) : (
          <></>
        )}
        <div className="flex flex-col justify-center items-center mt-5">
          <LoginBtn title="로그인" setErrMsg={setErrMsg} />
          <div className="flex flex-row justify-around w-1/3 mt-3">
            <div className="text-gray-400 hover:text-gray-200">
              <Link href={'/signup'}>회원가입</Link>
            </div>
            <div className="text-gray-400 hover:text-gray-200">
              {/* url 변경 */}
              <Link href={'/signup'}>비밀번호 찾기</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
