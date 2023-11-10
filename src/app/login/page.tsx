'use client'

import { useState } from 'react'

import RegisterInfo from '../component/pages/RegisterInfo'
import ConditionBtnGroup from '../component/ui/button/ConditionBtnGroup'
import Stepper from '../component/ui/stepper/Stepper'
import { useAppSelector } from '../module/hooks/reduxHooks'
import inputValidate from '../module/utils/inputValidate'

export default function Register() {
  const [isPwdView, setIsPwdView] = useState(false)
  const [isPwdConfirmView, setisPwdConfirmView] = useState(false)

  const isKeyInfoComplete = useAppSelector((state) => {
    const isEmailComplete = state.loginInfo.email.isCheck
    const isPwdComplete = state.loginInfo.pwd.isCheck
    const isNameComplete = state.loginInfo.name.isCheck
    const isPhoneNumComplete = state.loginInfo.phoneNumber.isCheck

    const isInfoComplete = isEmailComplete && isPwdComplete && isNameComplete && isPhoneNumComplete

    if (isInfoComplete) {
      return true
    } else return false
  })

  const isPwdConfirm = useAppSelector((state) => {
    const pwdValue = state.loginInfo.pwd.pwdValue
    const pwdConfirmValue = state.loginInfo.pwd.pwdConfirmValue
    if (pwdValue !== pwdConfirmValue) {
      return false
    }
    return true
  })

  const isPwdValidate = useAppSelector((state) => {
    const isValidate = inputValidate({ inputData: state.loginInfo.pwd.pwdValue, dataType: 'pwd' })

    if (!isValidate) {
      return false
    }
    return true
  })

  const handleStep = () => {
    if (!isKeyInfoComplete) {
      alert('위 항목을 모두 입력해 주세요.')
    } else if (!isPwdValidate) {
      alert('8글자 이상의 영어대소문자, 특수문자, 숫자를 포함한 문자열을 입력해주세요.')
    } else if (!isPwdConfirm) {
      alert('비밀번호 확인이 잘못 되었습니다.')
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
        />

        <div className="flex flex-row justify-center items-center">
          <ConditionBtnGroup handleStep={handleStep} />
        </div>
        <div className="mb-5">
          <Stepper />
        </div>
      </div>
    </div>
  )
}
