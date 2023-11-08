'use client'

import { useState } from 'react'

import AdditionalInfo from '../component/pages/loginInfo/AdditionalInfo'
import KeyInfo from '../component/pages/loginInfo/KeyInfo'
import ConditionBtnGroup from '../component/ui/button/ConditionBtnGroup'
import Stepper from '../component/ui/stepper/Stepper'
import { useAppSelector } from '../module/hooks/reduxHooks'

export default function Sign() {
  const [isPwdView, setIsPwdView] = useState(false)
  const [isPwdConfirmView, setisPwdConfirmView] = useState(false)
  const [isNext, setIsNext] = useState(false)

  const isKeyInfoComplete = useAppSelector((state) => {
    const isEmailComplete = state.loginInfo.email.isCheck
    const isPwdComplete = state.loginInfo.pwd.isCheck

    if (isEmailComplete && isPwdComplete) {
      return true
    } else return false
  })

  const handleStep = () => {
    if (!isKeyInfoComplete) {
      alert('중복/유효성 체크를 완료해주세요')
    } else {
      setIsNext(!isNext)
    }
  }

  return (
    // redirection main page after login or sign up
    <div className="flex flex-col justify-center items-center p 1">
      <div className="mt-10 w-3/5">
        {!isKeyInfoComplete || !isNext ? (
          <KeyInfo
            isPwdView={isPwdView}
            setIsPwdView={setIsPwdView}
            isPwdConfirmView={isPwdConfirmView}
            setIsPwdConfirmView={setisPwdConfirmView}
          />
        ) : (
          <AdditionalInfo />
        )}

        <div className="flex flex-row justify-center items-center">
          <ConditionBtnGroup
            isKeyInfoComplete={isKeyInfoComplete}
            isNext={isNext}
            handleStep={handleStep}
          />
        </div>
        <div className="mb-5">
          <Stepper />
        </div>
      </div>
    </div>
  )
}
