'use client'

import { useState } from 'react'

import RegisterOrg from '@/app/component/page/organization/RegisterOrg'
import ErrorAlert from '@/app/component/ui/alert/ErrorAlert'
import RegisterOrgLoginBtn from '@/app/component/ui/button/signup/RegisterOrgLoginBtn'
import { ORG_CREATE, ORG_JOIN } from '@/app/constant/constant'

export default function RegisterOrgLogin() {
  const [organization, setOrganization] = useState(ORG_CREATE)
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
  const changeOrgType = () => {
    if (organization === ORG_CREATE) {
      setOrganization(ORG_JOIN)
      return
    }
    setOrganization(ORG_CREATE)
  }
  const handleClickError = (): void => {
    setErrorState({
      isError: !errorState.isError,
      description: errorState.description,
    })
  }

  return (
    <div className="flex flex-col justify-center items-center p 1">
      <div className="text-xl font-bold mt-20">조직 생성 / 가입</div>
      <div className="mt-5">
        <button
          type="button"
          onClick={changeOrgType}
          className="text-indigo-500 hover:text-white dark:text-white dark:bg-indigo-500 dark:border-white bg-white border-indigo-500 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
        >
          {organization === ORG_CREATE ? '기존 조직에 참여하기' : '새로운 조직 생성하기'}
        </button>
      </div>
      <div className="mt-5 w-3/5">
        <RegisterOrg
          organization={organization}
          setOrganization={setOrganization}
          setErrMsg={setErrMsg}
        />
        {errorState.isError ? (
          <div className="mb-5 flex flex-col justify-center items-center">
            <ErrorAlert description={errorState.description} handleClickError={handleClickError} />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-row justify-around items-center w-1/3 mt-5">
        <RegisterOrgLoginBtn orgType={organization} setErrMsg={setErrMsg} />
      </div>
    </div>
  )
}
