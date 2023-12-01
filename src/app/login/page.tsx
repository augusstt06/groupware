'use client'

import { useEffect, useState } from 'react'

import { redirect } from 'next/navigation'
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'

import ErrorAlert from '../component/ui/alert/ErrorAlert'
import LoginBtn from '../component/ui/button/login/LoginBtn'
import LoginInput from '../component/ui/input/login/LoginInput'
import { KEY_ACCESS_TOKEN, REGISTER_EMAIL, REGISTER_PWD } from '../constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '../constant/errorMsg'
import useInput from '../module/hooks/reactHooks/useInput'
import { moduleGetCookie } from '../module/utils/cookie'
import { type UseInputProps } from '../types/moduleTypes'

export default function Login() {
  const [emailInput, pwdInput]: UseInputProps[] = [REGISTER_EMAIL, REGISTER_PWD].map(
    (title: string) => useInput('', title),
  )
  const [isPwdView, setIsPwdView] = useState(false)
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)

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
    if (accessToken !== ERR_COOKIE_NOT_FOUND) {
      redirect('/main')
    }
  }, [])

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
        <div className="flex flex-row justify-center items-center">
          <LoginBtn title="Login" setErrMsg={setErrMsg} />
        </div>
      </div>
    </div>
  )
}
