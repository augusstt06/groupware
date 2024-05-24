'use client'
import { useEffect, useRef, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import RegisterInfo from './_childs/userRegister/RegisterInfo'

import ErrorAlert from '@/_components/alert/ErrorAlert'
import Button from '@/_components/button/Button'
import {
  KEY_ACCESS_TOKEN,
  REGISTER_EMAIL,
  REGISTER_NAME,
  REGISTER_ORG_DESCRIPTION,
  REGISTER_ORG_JOIN,
  REGISTER_ORG_NAME,
  REGISTER_PHONENUMBER,
  REGISTER_POSITION,
  TRUE,
} from '@/_constant/constant'
import {
  ERR_COOKIE_NOT_FOUND,
  ERR_MESSAGE_SIGNUP_USER_EXIST,
  errDefault,
} from '@/_constant/errorMsg'
import { API_URL_LOGIN, API_URL_REGISTER } from '@/_constant/route/api-route-constant'
import { ROUTE_MAIN, ROUTE_SIGNUP_ORG } from '@/_constant/route/route-constant'
import { useAppDispatch, useAppSelector } from '@/_module/hooks/reduxHooks'
import { moduleGetCookie, moduleSetCookies } from '@/_module/utils/moduleCookie'
import { modulePostFetch } from '@/_module/utils/moduleFetch'
import inputValidate from '@/_module/utils/moduleInputValidate'
import { resetSignupInfoReducer } from '@/_store/reducers/login/signupInfoReducer'
import {
  type FailResponseType,
  type LoginResponseType,
  type ModulePostFetchProps,
  type SuccessResponseType,
} from '@/_types/module'

export default function Signup() {
  const signupButtonRef = useRef<HTMLButtonElement>(null)
  const dispatch = useAppDispatch()
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const loginCompleteState = useAppSelector((state) => state.maintain['login-complete'])
  const orgState = useAppSelector((state) => state.orgInfo)
  const signupState = useAppSelector((state) => state.signupInfo)
  const router = useRouter()
  const [isPwdView, setIsPwdView] = useState(false)
  const [isPwdConfirmView, setisPwdConfirmView] = useState(false)
  const [errorState, setErrorState] = useState({
    isError: false,
    description: '',
  })

  const setErrMsg = (errDescription: string) => {
    setErrorState({
      isError: true,
      description: errDescription,
    })
  }
  const handleClickError = (): void => {
    setErrorState({
      isError: !errorState.isError,
      description: errorState.description,
    })
  }
  const isPrivateInfoComplete: boolean = useAppSelector((state) => {
    const { email, pwd, name, phoneNumber, position } = state.signupInfo

    return (
      email.isCheck !== false &&
      pwd.isCheck !== false &&
      pwd.pwdConfirmValue === pwd.pwdValue &&
      name.isCheck !== false &&
      position.isCheck !== false &&
      phoneNumber.isCheck
    )
  })

  const isPwdConfirm: boolean = useAppSelector((state) => {
    const { pwdValue, pwdConfirmValue } = state.signupInfo.pwd
    return pwdValue === pwdConfirmValue
  })

  const isPwdValidate: boolean = useAppSelector((state) => {
    const isValidate: boolean = inputValidate({
      inputData: state.signupInfo.pwd.pwdValue,
      dataType: 'pwd',
    })

    if (!isValidate) {
      return false
    }
    return true
  })

  const checkInfoComplete = () => {
    if (!isPrivateInfoComplete) {
      setErrMsg('위 항목을 모두 입력해 주세요.')
      return false
    } else if (!isPwdValidate) {
      setErrMsg('8글자 이상의 영어대소문자, 특수문자, 숫자를 포함한 문자열을 입력해주세요.')
      return false
    } else if (!isPwdConfirm) {
      setErrMsg('비밀번호 확인이 잘못되었습니다. 다시 입력해주세요.')
      return false
    }
    return true
  }

  const fetchSignUp = async () => {
    try {
      if (signupState.email.isCheck === false) {
        setErrMsg('이메일이 중복됩니다. 다른 이메일을 사용해 주세요.')
        return
      }
      const fetchSignupProps: ModulePostFetchProps = {
        data: {
          email: signupState.email.value,
          name: signupState.name.value,
          password: signupState.pwd.pwdValue,
          passwordConfirm: signupState.pwd.pwdConfirmValue,
          phoneNumber: signupState.phoneNumber.value,
          position: signupState.position.value,
        },
        fetchUrl: API_URL_REGISTER,
      }
      const signupRes = await modulePostFetch<string>(fetchSignupProps)
      if (signupRes.status !== 200) throw new Error((signupRes as FailResponseType).message)
      const fetchLoginProps: ModulePostFetchProps = {
        data: {
          email: signupState.email.value,
          password: signupState.pwd.pwdValue,
        },
        fetchUrl: API_URL_LOGIN,
      }
      const loginRes = await modulePostFetch<LoginResponseType>(fetchLoginProps)
      if (loginRes.status !== 200) throw new Error((loginRes as FailResponseType).message)
      const accessToken = (loginRes as SuccessResponseType<LoginResponseType>).result.accessToken
      moduleSetCookies({
        [KEY_ACCESS_TOKEN]: accessToken,
      })
      dispatch(resetSignupInfoReducer())
      router.push(ROUTE_SIGNUP_ORG)
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case ERR_MESSAGE_SIGNUP_USER_EXIST:
            setErrMsg('이미 유저가 존재합니다.')
            break
          default:
            setErrMsg(errDefault('회원가입'))
            break
        }
      }
    }
  }

  const handleClickSignup = () => {
    checkInfoComplete()
    void fetchSignUp()
  }
  useEffect(() => {
    if (accessToken !== ERR_COOKIE_NOT_FOUND) {
      if (loginCompleteState === TRUE) {
        router.push(ROUTE_MAIN)
        return
      }
      router.push(ROUTE_SIGNUP_ORG)
    }
    if (orgState.createOrg.name !== '' || orgState.joinOrg.code !== '') {
      router.push(ROUTE_SIGNUP_ORG)
    }
    const deleteStorage = (arr: string[]) => {
      arr.forEach((name) => {
        localStorage.removeItem(name)
      })
    }
    deleteStorage([
      REGISTER_EMAIL,
      REGISTER_NAME,
      REGISTER_POSITION,
      REGISTER_PHONENUMBER,
      REGISTER_ORG_DESCRIPTION,
      REGISTER_ORG_NAME,
      REGISTER_ORG_JOIN,
    ])
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && signupButtonRef.current !== null) {
        signupButtonRef.current.click()
      }
    }
    document.addEventListener('keypress', handleKeyPress)
    return () => {
      document.removeEventListener('keypress', handleKeyPress)
    }
  }, [])

  return (
    <section className="justify-center p-1 sort-vertical-flex">
      <h1 className="mt-32 font-bold md:text-xl text-medium">Sign Up</h1>
      <section className="w-4/5 mt-5 md:w-2/5">
        <RegisterInfo
          isPwdView={isPwdView}
          setIsPwdView={setIsPwdView}
          isPwdConfirmView={isPwdConfirmView}
          setIsPwdConfirmView={setisPwdConfirmView}
          setErrMsg={setErrMsg}
        />

        {errorState.isError ? (
          <div className="w-3/5 mb-5 bg-white">
            <ErrorAlert description={errorState.description} handleClickError={handleClickError} />
          </div>
        ) : (
          <></>
        )}
      </section>
      <div className="justify-around w-2/3 mt-5 sort-vertical-flex md:w-1/3">
        <Link href="/">
          <Button
            buttonContent="Cancel"
            className="smooth-transition text-white bg-red-300 hover:bg-red-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-2 border-2"
          />
        </Link>
        {isPrivateInfoComplete ? (
          <Button
            ref={signupButtonRef}
            buttonContent="Sign Up"
            className="smooth-transition text-white bg-indigo-400 hover:bg-indigo-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-2 border-2"
            onClick={handleClickSignup}
          />
        ) : null}
      </div>
    </section>
  )
}
