'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import RegisterOrg from '@/app/component/page/organization/RegisterOrg'
import ErrorAlert from '@/app/component/ui/alert/ErrorAlert'
import { NavigationBtn } from '@/app/component/ui/button/BtnGroups'
import RegisterOrgLoginBtn from '@/app/component/ui/button/signup/RegisterOrgLoginBtn'
import {
  KEY_ACCESS_TOKEN,
  KEY_LOGIN_COMPLETE,
  ORG_CREATE,
  ORG_JOIN,
  TRUE,
} from '@/app/constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '@/app/constant/errorMsg'
import { ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN, ROUTE_MAIN } from '@/app/constant/route-constant'
import { useAppSelector } from '@/app/module/hooks/reduxHooks'
import moduleGetCookie, { moduleDeleteCookies } from '@/app/module/utils/moduleCookie'

export default function RegisterOrgLogin() {
  const router = useRouter()

  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const loginCompleteState = useAppSelector((state) => state.maintain['login-complete'])

  const [organization, setOrganization] = useState('')
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
  useEffect(() => {
    if (accessToken !== ERR_COOKIE_NOT_FOUND && loginCompleteState === TRUE) {
      router.push(ROUTE_MAIN)
      return
    }
    const checkAccessToken = () => {
      const newAccessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
      if (newAccessToken === ERR_COOKIE_NOT_FOUND) {
        router.push(ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN)
      } else if (newAccessToken !== accessToken) {
        setAccessToken(newAccessToken)
      }
      if (loginCompleteState === TRUE) {
        moduleDeleteCookies(KEY_LOGIN_COMPLETE)
      }
    }

    const intervalId = setInterval(checkAccessToken, 500)

    return () => {
      clearInterval(intervalId)
    }
  }, [accessToken])

  return (
    <div className="flex flex-col justify-center items-center h-screen px-4">
      {organization === '' ? (
        <>
          <h2 className="mb-5 md:text-2xl text-xl font-bold text-center">조직 선택</h2>
          <span className="md:text-medium text-xs mt-5">
            조직 생성/코드 입력으로 조직에 참가해 주세요
          </span>
          <div className="flex flex-row md:w-1/3 w-full justify-around mt-10">
            <div
              onClick={() => {
                setOrganization(ORG_CREATE)
              }}
            >
              <NavigationBtn title="조직 생성" />
            </div>
            <div
              onClick={() => {
                setOrganization(ORG_JOIN)
              }}
            >
              <NavigationBtn title="조직 가입" />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col w-full justify-center items-center h-screen px-4 place-content-center">
          <div className="md:text-2xl text-xl font-bold mt-20">
            {organization === ORG_CREATE ? '조직 생성' : '조직 가입'}
          </div>
          <div className="mt-5">
            <span
              className="md:text-sm text-xs text-gray-400 hover:text-gray-200"
              onClick={changeOrgType}
            >
              {organization === ORG_CREATE ? '기존 조직에 참여하기' : '새로운 조직 생성하기'}
            </span>
          </div>
          <div className="mt-5 md:w-3/5 w-full mb-16">
            <RegisterOrg
              organization={organization}
              setOrganization={setOrganization}
              setErrMsg={setErrMsg}
            />
            {errorState.isError ? (
              <div className="flex flex-col justify-center items-center">
                <ErrorAlert
                  description={errorState.description}
                  handleClickError={handleClickError}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-row justify-around items-center md:w-1/3 w-2/3 mt-2">
            <RegisterOrgLoginBtn orgType={organization} setErrMsg={setErrMsg} />
          </div>
        </div>
      )}
    </div>
  )
}
