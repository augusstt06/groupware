'use client'

import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/navigation'

import RegisterOrg from '@/app/component/page/organization/RegisterOrg'
import ErrorAlert from '@/app/component/ui/alert/ErrorAlert'
import Button from '@/app/component/ui/button/Button'
import {
  API_SUCCESS_CODE,
  FALSE,
  KEY_ACCESS_TOKEN,
  KEY_LOGIN_COMPLETE,
  ORG_CREATE,
  ORG_JOIN,
  REGISTER_ORG_DESCRIPTION,
  REGISTER_ORG_JOIN,
  REGISTER_ORG_NAME,
  TRUE,
} from '@/app/constant/constant'
import {
  ERR_COOKIE_NOT_FOUND,
  ERR_MESSAGE_JOIN_ORG_FAIL_EXIST,
  ERR_MESSAGE_ORG_ALREADY_EXIST,
  ERR_MESSAGE_RECORD_NOT_FOUND,
  errNotEntered,
  errNotFound,
} from '@/app/constant/errorMsg'
import { API_URL_CREATE_ORG, API_URL_JOIN_ORG } from '@/app/constant/route/api-route-constant'
import {
  ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN,
  ROUTE_MAIN,
  ROUTE_SIGNUP_COMPLETE,
} from '@/app/constant/route/route-constant'
import { useAppDispatch, useAppSelector } from '@/app/module/hooks/reduxHooks'
import { moduleDeleteCookies, moduleGetCookie } from '@/app/module/utils/moduleCookie'
import { modulePostFetch } from '@/app/module/utils/moduleFetch'
import { moduleDeleteStorage } from '@/app/module/utils/moduleStorage'
import { updateLoginCompleteReducer } from '@/app/store/reducers/maintain/maintainReducer'
import { type FailResponseType, type ModulePostFetchProps } from '@/app/types/moduleTypes'

export default function RegisterOrgLogin() {
  const router = useRouter()
  const orgButtonRef = useRef<HTMLButtonElement>(null)
  const dispatch = useAppDispatch()
  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const loginCompleteState = useAppSelector((state) => state.maintain['login-complete'])
  const orgState = useAppSelector((state) => state.orgInfo)
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
  const isOrgComeplete = useAppSelector((state) => {
    const { name, description } = state.orgInfo.createOrg
    const { code } = state.orgInfo.joinOrg

    switch (organization) {
      case ORG_CREATE:
        return name !== '' && description !== ''

      case ORG_JOIN:
        return code !== ''
      default:
        return false
    }
  })

  const orgInputError = () => {
    switch (organization) {
      case ORG_CREATE:
        setErrMsg(errNotEntered('필수 항목'))
        break
      case ORG_JOIN:
        setErrMsg(errNotEntered('조직코드'))
    }
  }
  const fetchOrg = async () => {
    try {
      const fetchProps: ModulePostFetchProps =
        organization === ORG_CREATE
          ? {
              data: {
                description: orgState.createOrg.description,
                name: orgState.createOrg.name,
              },
              fetchUrl: API_URL_CREATE_ORG,
              header: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          : {
              data: {
                code: orgState.joinOrg.code,
              },
              fetchUrl: API_URL_JOIN_ORG,
              header: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
      const res = await modulePostFetch<string>(fetchProps)
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)

      moduleDeleteStorage([REGISTER_ORG_DESCRIPTION, REGISTER_ORG_NAME, REGISTER_ORG_JOIN])
      dispatch(updateLoginCompleteReducer(FALSE))
      moduleDeleteCookies(KEY_ACCESS_TOKEN)
      router.push(ROUTE_SIGNUP_COMPLETE)
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case ERR_MESSAGE_RECORD_NOT_FOUND:
            setErrMsg(errNotFound('입력한 조직'))
            break
          case ERR_MESSAGE_JOIN_ORG_FAIL_EXIST:
            setErrMsg('이미 해당 조직에 가입되어 있습니다.')
            break
          case ERR_MESSAGE_ORG_ALREADY_EXIST:
            setErrMsg('이미 같은 이름의 조직이 존재합니다.')
            break
        }
      }
    }
  }
  const handleFetchOrg = () => {
    if (!isOrgComeplete) {
      orgInputError()
      return
    }
    void fetchOrg()
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

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && orgButtonRef.current !== null) {
        orgButtonRef.current.click()
      }
    }
    document.addEventListener('keypress', handleKeyPress)
    return () => {
      document.removeEventListener('keypress', handleKeyPress)
    }
  }, [])

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
              <Button
                content="조직 생성"
                className="transition ease-in-out duration-500 text-white bg-indigo-400 hover:bg-indigo-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
              />
            </div>
            <div
              onClick={() => {
                setOrganization(ORG_JOIN)
              }}
            >
              <Button
                content="조직 가입"
                className="transition ease-in-out duration-500 text-white bg-indigo-400 hover:bg-indigo-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
              />
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
              className="md:text-sm text-xs text-gray-400 hover:text-gray-700 hover:font-bold hover:dark:text-gray-200 cursor-pointer"
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
            <Button
              ref={orgButtonRef}
              content={organization === ORG_CREATE ? '조직 생성' : '조직 가입'}
              className="transition ease-in-out duration-500 text-white bg-indigo-400 hover:bg-indigo-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
              onClick={handleFetchOrg}
            />
          </div>
        </div>
      )}
    </div>
  )
}
