'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'

import ErrorAlert from './component/ui/alert/ErrorAlert'
import LoginBtn from './component/ui/button/login/LoginBtn'
import LoginInput from './component/ui/input/login/LoginInput'
import {
  FALSE,
  KEY_ACCESS_TOKEN,
  KEY_LOGIN_COMPLETE,
  REGISTER_EMAIL,
  REGISTER_PWD,
  TRUE,
} from './constant/constant'
import { ERR_COOKIE_NOT_FOUND } from './constant/errorMsg'
import {
  ROUTE_ERR_NOT_FOUND_ORG_TOKEN,
  ROUTE_FIND_PWD,
  ROUTE_MAIN,
  ROUTE_SIGNUP,
} from './constant/route-constant'
import useInput from './module/hooks/reactHooks/useInput'
import { useAppDispatch, useAppSelector } from './module/hooks/reduxHooks'
import { moduleGetCookie } from './module/utils/moduleCookie'
import { updateLoginCompleteReducer } from './store/reducers/maintain/maintainReducer'
import { type UseInputProps } from './types/moduleTypes'

export default function Login() {
  const [emailInput, pwdInput]: UseInputProps[] = [REGISTER_EMAIL, REGISTER_PWD].map(
    (title: string) => useInput('', title),
  )

  const dispatch = useAppDispatch()
  const router = useRouter()
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
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
    if (accessToken !== ERR_COOKIE_NOT_FOUND) {
      if (loginCompleteState === FALSE) {
        router.push(ROUTE_ERR_NOT_FOUND_ORG_TOKEN)
      } else {
        router.push(ROUTE_MAIN)
      }
      return
    }
    if (loginCompleteState === TRUE) {
      dispatch(updateLoginCompleteReducer(FALSE))
    }
  }, [])

  return (
    <div className="flex flex-col justify-center items-center h-screen px-4 place-content-center">
      <div className="text-xl md:font-bold mb-6">로그인</div>
      <div className="w-4/5 md:w-2/5">
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
          <div className="w-2/3">
            <LoginBtn title="로그인" setErrMsg={setErrMsg} />
          </div>
          <div className="flex flex-row justify-around md:w-2/3 w-full mt-3">
            <div className="text-sm text-gray-400 hover:text-gray-200">
              <Link href={ROUTE_SIGNUP}>회원가입</Link>
            </div>
            <div className="text-sm text-gray-400 hover:text-gray-200">
              <Link href={ROUTE_FIND_PWD}>비밀번호찾기</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
