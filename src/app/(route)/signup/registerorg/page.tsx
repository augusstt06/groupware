'use client'

import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/navigation'
import { FaExchangeAlt } from 'react-icons/fa'

import RegisterOrg from '../_childs/organization/RegisterOrg'

import ErrorAlert from '@/components/alert/ErrorAlert'
import Button from '@/components/button/Button'
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
} from '@/constant/constant'
import {
  ERR_COOKIE_NOT_FOUND,
  ERR_MESSAGE_JOIN_ORG_FAIL_EXIST,
  ERR_MESSAGE_ORG_ALREADY_EXIST,
  ERR_MESSAGE_RECORD_NOT_FOUND,
  errNotEntered,
  errNotFound,
} from '@/constant/errorMsg'
import { API_URL_CREATE_ORG, API_URL_JOIN_ORG } from '@/constant/route/api-route-constant'
import {
  ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN,
  ROUTE_MAIN,
  ROUTE_SIGNUP_COMPLETE,
} from '@/constant/route/route-constant'
import { useAppDispatch, useAppSelector } from '@/module/hooks/reduxHooks'
import { moduleDeleteCookies, moduleGetCookie } from '@/module/utils/moduleCookie'
import { modulePostFetch } from '@/module/utils/moduleFetch'
import { moduleDeleteStorage } from '@/module/utils/moduleStorage'
import { createAccessTokenManager } from '@/module/utils/token'
import { updateLoginCompleteReducer } from '@/store/reducers/maintain/maintainReducer'
import { type FailResponseType, type ModulePostFetchProps } from '@/types/module'

export default function RegisterOrgLogin() {
  const router = useRouter()
  const orgButtonRef = useRef<HTMLButtonElement>(null)
  const dispatch = useAppDispatch()
  const { getAccessToken, setAccessToken } = createAccessTokenManager
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
  const isOrgComeplete: boolean = useAppSelector((state) => {
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
                Authorization: `Bearer ${getAccessToken()}`,
              },
            }
          : {
              data: {
                code: orgState.joinOrg.code,
              },
              fetchUrl: API_URL_JOIN_ORG,
              header: {
                Authorization: `Bearer ${getAccessToken()}`,
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
    if (getAccessToken() !== ERR_COOKIE_NOT_FOUND && loginCompleteState === TRUE) {
      router.push(ROUTE_MAIN)
      return
    }
    // FIXME: 아래 함수 로직 확인해서 모듈에 넣을것 생각하기
    const checkAccessToken = () => {
      const newAccessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
      if (newAccessToken === ERR_COOKIE_NOT_FOUND) {
        router.push(ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN)
      } else if (newAccessToken !== getAccessToken()) {
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
  }, [getAccessToken()])

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
    <section className="justify-center h-screen px-4 sort-vertical-flex">
      {organization === '' ? (
        <>
          <h1 className="mb-5 text-xl font-bold text-center md:text-2xl">조직 선택</h1>
          <h2 className="mt-5 text-sm md:text-medium">
            조직 생성/코드 입력으로 조직에 참가해 주세요
          </h2>
          <div className="flex flex-row justify-around w-full mt-10 md:w-1/3">
            <div
              onClick={() => {
                setOrganization(ORG_CREATE)
              }}
            >
              <Button
                buttonContent="조직 생성"
                className="smooth-transition text-white bg-indigo-400 hover:bg-indigo-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
              />
            </div>
            <div
              onClick={() => {
                setOrganization(ORG_JOIN)
              }}
            >
              <Button
                buttonContent="조직 가입"
                className="smooth-transition text-white bg-indigo-400 hover:bg-indigo-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="justify-center w-full h-screen px-4 sort-vertical-flex place-content-center">
          {organization === ORG_CREATE ? (
            <h1 className="mt-20 text-xl font-bold md:text-2xl">Create Organization</h1>
          ) : (
            <h1 className="mt-20 text-xl font-bold md:text-2xl">Join Organization</h1>
          )}

          <div className="mt-5">
            <p
              className="text-xs text-gray-500 cursor-pointer smooth-transition md:text-sm hover:text-blue-500 dark:hover:text-blue-500 hover:scale-110  hover:font-bold hover:dark:text-gray-200"
              onClick={changeOrgType}
            >
              {organization === ORG_CREATE ? (
                <div className="flex items-center justify-around">
                  <FaExchangeAlt className="mr-2" />
                  Join an existing Organization
                </div>
              ) : (
                <div className="flex items-center justify-around">
                  <FaExchangeAlt className="mr-2" />
                  Create Organization
                </div>
              )}
            </p>
          </div>
          <div className="w-full mt-5 mb-16 md:w-3/5">
            <RegisterOrg
              organization={organization}
              setOrganization={setOrganization}
              setErrMsg={setErrMsg}
            />
            {errorState.isError ? (
              <div className="justify-center sort-vertical-flex">
                <ErrorAlert
                  description={errorState.description}
                  handleClickError={handleClickError}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="justify-around w-2/3 mt-2 sort-row-flex md:w-1/3">
            <Button
              ref={orgButtonRef}
              buttonContent={organization === ORG_CREATE ? '조직 생성' : '조직 가입'}
              className="smooth-transition text-white bg-indigo-400 hover:bg-indigo-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-white dark:hover:text-indigo-500 mb-2 border-2 dark:hover:border-indigo-500/75"
              onClick={handleFetchOrg}
            />
          </div>
        </div>
      )}
    </section>
  )
}
