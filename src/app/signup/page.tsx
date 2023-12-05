'use client'
import { useEffect, useState } from 'react'

import Link from 'next/link'

import RegisterOrg from '../component/page/organization/RegisterOrg'
import RegisterInfo from '../component/page/userRegister/RegisterInfo'
import ErrorAlert from '../component/ui/alert/ErrorAlert'
import { NavigationBtn, NextBtn } from '../component/ui/button/BtnGroups'
import { SignupBtn } from '../component/ui/button/signup/SignupBtn'
import {
  ORG_CREATE,
  ORG_JOIN,
  REGISTER_EMAIL,
  REGISTER_NAME,
  REGISTER_ORG_DESCRIPTION,
  REGISTER_ORG_JOIN,
  REGISTER_ORG_NAME,
  REGISTER_PHONENUMBER,
  REGISTER_POSITION,
} from '../constant/constant'
import { useAppSelector } from '../module/hooks/reduxHooks/index'
import inputValidate from '../module/utils/inputValidate'

export default function Register() {
  const [step, setStep] = useState(false)
  const [isPwdView, setIsPwdView] = useState(false)
  const [isPwdConfirmView, setisPwdConfirmView] = useState(false)
  const [errorState, setErrorState] = useState({
    isError: false,
    description: '',
  })

  const [organization, setOrganization] = useState('')

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

  const isSignupInfoComplete: boolean = useAppSelector((state) => {
    const { createOrg, joinOrg } = state.orgInfo

    const isCreateOrgInfoComplete =
      createOrg.description.length !== 0 && createOrg.name.length !== 0

    const isJoinOrgInfoComplete = joinOrg.code.length !== 0
    const isOrgComeplete =
      organization === ORG_CREATE ? isCreateOrgInfoComplete : isJoinOrgInfoComplete

    return isOrgComeplete && isPrivateInfoComplete
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
  const handleStep = () => {
    if (!checkInfoComplete()) return
    setOrganization(ORG_CREATE)
    setStep(!step)
  }
  const changeOrgType = () => {
    if (organization === ORG_CREATE) {
      setOrganization(ORG_JOIN)
      return
    }
    setOrganization(ORG_CREATE)
  }

  useEffect(() => {
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
      <div className="mt-10">
        {organization !== '' && step ? (
          <button
            type="button"
            onClick={changeOrgType}
            className="text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white bg-white border-indigo-500 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
          >
            {organization === ORG_CREATE ? '기존 조직에 참여하기' : '새로운 조직 생성하기'}
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className="mt-5 w-3/5">
        {!step ? (
          <RegisterInfo
            isPwdView={isPwdView}
            setIsPwdView={setIsPwdView}
            isPwdConfirmView={isPwdConfirmView}
            setIsPwdConfirmView={setisPwdConfirmView}
            setErrMsg={setErrMsg}
          />
        ) : (
          <RegisterOrg
            organization={organization}
            setOrganization={setOrganization}
            setErrMsg={setErrMsg}
          />
        )}

        {errorState.isError ? (
          <div className="mb-5">
            <ErrorAlert description={errorState.description} handleClickError={handleClickError} />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-row justify-around items-center w-1/3 mt-5">
        <Link href="/">
          <NavigationBtn title="메인으로" />
        </Link>
        {isPrivateInfoComplete ? (
          <NextBtn
            title={!step ? '다음 단계' : '이전 단계'}
            onClick={() => {
              handleStep()
            }}
          />
        ) : (
          <></>
        )}

        {isSignupInfoComplete && step ? (
          <SignupBtn title="회원가입" orgType={organization} setErrMsg={setErrMsg} />
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
