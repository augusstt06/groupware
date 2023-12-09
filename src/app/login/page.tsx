'use client'

import { useState } from 'react'

import Link from 'next/link'
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'

import ErrorAlert from '../component/ui/alert/ErrorAlert'
import { NavigationBtn } from '../component/ui/button/BtnGroups'
import LoginBtn from '../component/ui/button/login/LoginBtn'
import LoginInput from '../component/ui/input/login/LoginInput'
import { REGISTER_EMAIL, REGISTER_PWD } from '../constant/constant'
import useInput from '../module/hooks/reactHooks/useInput'
import { type UseInputProps } from '../types/moduleTypes'

export default function Login() {
  const [emailInput, pwdInput]: UseInputProps[] = [REGISTER_EMAIL, REGISTER_PWD].map(
    (title: string) => useInput('', title),
  )
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

  return (
    <div className="flex flex-col justify-center items-center p 1">
      <div className="mt-20 w-3/5">
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
          <Link href="/" className="mt-2">
            <NavigationBtn title="메인으로" />
          </Link>
        </div>
      </div>
    </div>
  )
}
