'use client'

import { useState } from 'react'

import RegisterOrg from '../component/page/organization/RegisterOrg'
import RegisterInfo from '../component/page/userRegister/RegisterInfo'
import ErrorAlert from '../component/ui/alert/ErrorAlert'
import { NextBtn } from '../component/ui/button/BtnGroups'
import OrgChooseBtn from '../component/ui/button/organization/OrgChooseBtn'
import RegisterUserBtn from '../component/ui/button/register/RegisterUserBtn'
import { useAppSelector } from '../module/hooks/reduxHooks/index'
import inputValidate from '../module/utils/inputValidate'

export default function Register() {
  const [step, setStep] = useState('first')
  const [isPwdView, setIsPwdView] = useState(false)
  const [isPwdConfirmView, setisPwdConfirmView] = useState(false)
  const [errorState, setErrorState] = useState({
    error: false,
    description: '',
  })
  const [organization, setOrganization] = useState('')

  const setErrMsg = (errDescription: string) => {
    setErrorState({
      error: true,
      description: errDescription,
    })
  }
  const handleClickError = (): void => {
    setErrorState({
      error: !errorState.error,
      description: errorState.description,
    })
  }
  const isPrivateInfoComplete: boolean = useAppSelector((state) => {
    const { email, pwd, name, phoneNumber } = state.signupInfo

    return email.isCheck && pwd.isCheck && name.isCheck && phoneNumber.isCheck
  })

  const isSignupInfoComplete: boolean = useAppSelector((state) => {
    const { organization } = state.signupInfo
    return organization.isCheck && isPrivateInfoComplete
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
  }
  const handleStep = (stepControl: string) => {
    checkInfoComplete()
    // 단계 switch 로 컨트롤 하기
    if (!(checkInfoComplete() ?? false)) return
    setStep(stepControl)
  }
  return (
    <div className="flex flex-col justify-center items-center p 1">
      <div className="mt-10 w-3/5">
        {step === 'first' ? (
          <RegisterInfo
            isPwdView={isPwdView}
            setIsPwdView={setIsPwdView}
            isPwdConfirmView={isPwdConfirmView}
            setIsPwdConfirmView={setisPwdConfirmView}
            setErrMsg={setErrMsg}
          />
        ) : step === 'second' ? (
          <div className="w-2/5 h-2/4">
            <OrgChooseBtn organization={organization} setOrganization={setOrganization} />
          </div>
        ) : (
          // <div className="bg-white">
          <RegisterOrg organization={organization} setOrganization={setOrganization} />
          // </div>
        )}

        {errorState.error ? (
          <div className="mb-5">
            <ErrorAlert description={errorState.description} handleClickError={handleClickError} />
          </div>
        ) : (
          <></>
        )}

        <div className="flex flex-row justify-center items-center">
          <NextBtn title={step !== 'third' ? 'Next' : 'Back'} onClick={handleStep} />
          {/* 즉시 로그인 */}
          {isSignupInfoComplete ? <RegisterUserBtn setErrMsg={setErrMsg} /> : <></>}
        </div>
      </div>
    </div>
  )
}
