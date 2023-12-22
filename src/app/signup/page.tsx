'use client'
import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import RegisterInfo from '../component/page/userRegister/RegisterInfo'
import ErrorAlert from '../component/ui/alert/ErrorAlert'
import { NavigationBtn } from '../component/ui/button/BtnGroups'
import { SignupBtn } from '../component/ui/button/signup/SignupBtn'
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
} from '../constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '../constant/errorMsg'
import { ROUTE_MAIN, ROUTE_SIGNUP_ORG } from '../constant/route-constant'
import { useAppSelector } from '../module/hooks/reduxHooks/index'
import { moduleGetCookie } from '../module/utils/moduleCookie'
import inputValidate from '../module/utils/moduleInputValidate'

export default function Signup() {
  const accessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
  const loginCompleteState = useAppSelector((state) => state.maintain['login-complete'])
  const orgState = useAppSelector((state) => state.orgInfo)
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
      email.isCheck &&
      pwd.isCheck &&
      pwd.pwdConfirmValue === pwd.pwdValue &&
      name.isCheck &&
      position.isCheck &&
      phoneNumber.isCheck
    )
  })

  const isPwdConfirm: boolean = useAppSelector((state) => {
    const { pwdValue, pwdConfirmValue } = state.signupInfo.pwd
    return pwdValue === pwdConfirmValue
  })

  const isPwdValidate: boolean = useAppSelector((state) => {
    const isValidate = inputValidate({ inputData: state.signupInfo.pwd.pwdValue, dataType: 'pwd' })

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
  }, [])

  return (
    <div className="flex flex-col justify-center items-center p 1">
      <div className="md:text-xl text-medium font-bold mt-20">회원가입</div>
      <div className="mt-5 md:w-3/5 w-4/5">
        <RegisterInfo
          isPwdView={isPwdView}
          setIsPwdView={setIsPwdView}
          isPwdConfirmView={isPwdConfirmView}
          setIsPwdConfirmView={setisPwdConfirmView}
          setErrMsg={setErrMsg}
        />

        {errorState.isError ? (
          <div className="mb-5 bg-white w-3/5">
            <ErrorAlert description={errorState.description} handleClickError={handleClickError} />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-row justify-around items-center md:w-1/3 w-2/3 mt-5">
        <Link href="/">
          <NavigationBtn title="메인으로" />
        </Link>
        {isPrivateInfoComplete ? (
          <SignupBtn title="회원가입" setErrMsg={setErrMsg} checkInfoComplete={checkInfoComplete} />
        ) : null}
      </div>
    </div>
  )
}
