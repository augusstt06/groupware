'use client'

import { useState } from 'react'

import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'

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
        <div className="flex flex-row justify-center items-center">
          <LoginBtn title="Login" />
        </div>
      </div>
    </div>
  )
}
