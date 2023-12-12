'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import RegisterOrg from '@/app/component/page/organization/RegisterOrg'
import ErrorAlert from '@/app/component/ui/alert/ErrorAlert'
import { NavigationBtn } from '@/app/component/ui/button/BtnGroups'
import RegisterOrgLoginBtn from '@/app/component/ui/button/signup/RegisterOrgLoginBtn'
import {
  KEY_ACCESS_TOKEN,
  KEY_LOGIN,
  ORG_CREATE,
  ORG_JOIN,
  ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN,
} from '@/app/constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '@/app/constant/errorMsg'
import { moduleDeleteCookies, moduleGetCookie } from '@/app/module/utils/cookie'

export default function RegisterOrgLogin() {
  const router = useRouter()

  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))

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
    const checkAccessToken = () => {
      const loginToken = moduleGetCookie(KEY_LOGIN)
      const newAccessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
      if (newAccessToken === ERR_COOKIE_NOT_FOUND) {
        router.push(ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN)
      } else if (newAccessToken !== accessToken) {
        setAccessToken(newAccessToken)
      }
      if (loginToken !== ERR_COOKIE_NOT_FOUND) {
        moduleDeleteCookies(KEY_LOGIN)
      }
    }

    const intervalId = setInterval(checkAccessToken, 500)

    return () => {
      clearInterval(intervalId)
    }
  }, [accessToken])

  return (
    <div className="flex flex-col justify-center items-center p 1">
      {organization === '' ? (
        <div className="grid h-screen px-4 place-content-center">
          <h2 className="mb-5 text-2xl font-bold text-center">조직 선택</h2>
          <span className="text-medium mt-5">
            조직을 생성하거나 초대코드를 입력해 조직에 참가해 주세요
          </span>
          <div className="flex flex-row w-full justify-around mt-10">
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
        </div>
      ) : (
        <>
          <div className="text-2xl font-bold mt-20">
            {organization === ORG_CREATE ? '조직 생성' : '조직 가입'}
          </div>
          <div className="mt-5">
            <span className="text-sm text-gray-400 hover:text-gray-200" onClick={changeOrgType}>
              {organization === ORG_CREATE ? '기존 조직에 참여하기' : '새로운 조직 생성하기'}
            </span>
          </div>
          <div className="mt-5 w-3/5">
            <RegisterOrg
              organization={organization}
              setOrganization={setOrganization}
              setErrMsg={setErrMsg}
            />
            {errorState.isError ? (
              <div className="mb-5 flex flex-col justify-center items-center">
                <ErrorAlert
                  description={errorState.description}
                  handleClickError={handleClickError}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-row justify-around items-center w-1/3 mt-5">
            <RegisterOrgLoginBtn orgType={organization} setErrMsg={setErrMsg} />
          </div>
        </>
      )}
    </div>
  )
}
