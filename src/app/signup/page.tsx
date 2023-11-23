'use client'

import { useState } from 'react'

import RegisterInfo from '../component/page/userRegister/RegisterInfo'
import ErrorAlert from '../component/ui/alert/ErrorAlert'
import RegisterUserBtn from '../component/ui/button/register/RegisterUserBtn'
import { useAppSelector } from '../module/hooks/reduxHooks'
import inputValidate from '../module/utils/inputValidate'

export default function Register() {
  const [isPwdView, setIsPwdView] = useState(false)
  const [isPwdConfirmView, setisPwdConfirmView] = useState(false)
  const [errorState, setErrorState] = useState({
    error: false,
    description: '',
  })
  const setErrMsg = (errDescription: string) => {
    setErrorState({
      error: true,
      description: errDescription,
    })
  }
  const handleClickError = () => {
    setErrorState({
      error: !errorState.error,
      description: errorState.description,
    })
  }
  const isKeyInfoComplete = useAppSelector((state) => {
    const { email, pwd, name, phoneNumber } = state.signupInfo

    return email.isCheck && pwd.isCheck && name.isCheck && phoneNumber.isCheck
  })

  const isPwdConfirm = useAppSelector((state) => {
    const { pwdValue, pwdConfirmValue } = state.signupInfo.pwd
    return pwdValue === pwdConfirmValue
  })

  const isPwdValidate = useAppSelector((state) => {
    const isValidate = inputValidate({ inputData: state.signupInfo.pwd.pwdValue, dataType: 'pwd' })

    if (!isValidate) {
      return false
    }
    return true
  })

  const handleStep = () => {
    if (!isKeyInfoComplete) {
      setErrMsg('위 항목을 모두 입력해 주세요.')
    } else if (!isPwdValidate) {
      setErrMsg('8글자 이상의 영어대소문자, 특수문자, 숫자를 포함한 문자열을 입력해주세요.')
    } else if (!isPwdConfirm) {
      setErrMsg('비밀번호 확인이 잘못되었습니다. 다시 입력해주세요.')
    }
  }

  return (
    <div className="flex flex-col justify-center items-center p 1">
      <div className="mt-10 w-3/5">
        <RegisterInfo
          isPwdView={isPwdView}
          setIsPwdView={setIsPwdView}
          isPwdConfirmView={isPwdConfirmView}
          setIsPwdConfirmView={setisPwdConfirmView}
          setErrMsg={setErrMsg}
        />
        {errorState.error ? (
          <ErrorAlert description={errorState.description} handleClickError={handleClickError} />
        ) : (
          <></>
        )}

        <div className="flex flex-row justify-center items-center">
          <RegisterUserBtn handleStep={handleStep} setErrMsg={setErrMsg} />
        </div>
      </div>
    </div>
  )
}
