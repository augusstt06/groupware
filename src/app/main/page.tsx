'use client'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import { TbSquareArrowLeftFilled, TbSquareArrowRightFilled } from 'react-icons/tb'

import MainHub from '../component/page/main/hub/MainHub'
import MainCardGroup from '../component/ui/card/MainCardGroup'
import {
  KEY_ACCESS_TOKEN,
  KEY_LOGIN,
  KEY_ORGANIZATION,
  KEY_UUID,
  KEY_X_ORGANIZATION_CODE,
  TRUE,
} from '../constant/constant'
import { ERR_COOKIE_NOT_FOUND, ERR_ORG_NOT_FOUND } from '../constant/errorMsg'
import {
  ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN,
  ROUTE_ERR_NOT_FOUND_ORG_TOKEN,
} from '../constant/route-constant'
import { useAppDispatch, useAppSelector } from '../module/hooks/reduxHooks'
import { moduleDecodeToken, moduleDeleteCookies, moduleGetCookie } from '../module/utils/cookie'
import { moduleGetFetch } from '../module/utils/moduleFetch'
import {
  updateAttendanceStatusReducer,
  updateExtraUserInfoReducer,
  updateUserInfoReducer,
} from '../store/reducers/main/userInfoReducer'
import {
  type ApiRes,
  type CustomDecodeTokenType,
  type FailResponseType,
  type FetchResponseType,
  type ModuleGetFetchProps,
  type SuccessResponseType,
} from '../types/moduleTypes'

export default function Main() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const orgToken = moduleGetCookie(KEY_ORGANIZATION)
  const decodeToken = moduleDecodeToken(accessToken)
  const attendanceTime = useAppSelector((state) => state.userInfo.attendance.time)
  const uuid =
    decodeToken !== ERR_COOKIE_NOT_FOUND
      ? (decodeToken as CustomDecodeTokenType).uuid
      : ERR_COOKIE_NOT_FOUND

  const [reRender, setRerender] = useState(false)
  const getFetchUserProps: ModuleGetFetchProps = {
    params: {
      [KEY_UUID]: uuid,
    },
    fetchUrl: process.env.NEXT_PUBLIC_USERS_SOURCE,
    header: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  const fetchGetUsers = async () => {
    try {
      const res = await moduleGetFetch<FetchResponseType<ApiRes>>(getFetchUserProps)
      if (res.status !== 200) throw new Error((res as FailResponseType).message)

      const successRes = res as SuccessResponseType<ApiRes>
      const extraUserInfoReducerProps = {
        name: successRes.result.name,
        position: successRes.result.position,
        userId: successRes.result.userId,
        organizationId: successRes.result.organizationId,
        organizationName: successRes.result.organizationName,
      }
      const userReducerProps = {
        [KEY_X_ORGANIZATION_CODE]: successRes.result.organizationCode as string,
        [KEY_UUID]: successRes.result[KEY_UUID] as string,
      }
      const attendanceReducerProps = {
        status: successRes.result.attendanceStatus as string,
        time: attendanceTime,
      }
      dispatch(updateExtraUserInfoReducer(extraUserInfoReducerProps))
      dispatch(updateUserInfoReducer(userReducerProps))
      dispatch(updateAttendanceStatusReducer(attendanceReducerProps))
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case ERR_ORG_NOT_FOUND:
            moduleDeleteCookies(KEY_ORGANIZATION)
            router.push(ROUTE_ERR_NOT_FOUND_ORG_TOKEN)
            break
          default:
            moduleDeleteCookies(KEY_ACCESS_TOKEN, KEY_ORGANIZATION)
        }
      }
    }
  }

  useEffect(() => {
    if (accessToken === ERR_COOKIE_NOT_FOUND) {
      router.push(ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN)
      return
    }
    if (orgToken === ERR_COOKIE_NOT_FOUND) {
      router.push(ROUTE_ERR_NOT_FOUND_ORG_TOKEN)
      return
    }
    let newAccessToken
    let newOrgToken
    let newLoginToken
    const checkAccessToken = () => {
      newAccessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
      newOrgToken = moduleGetCookie(KEY_ORGANIZATION)
      newLoginToken = moduleGetCookie(KEY_LOGIN)
      if (newAccessToken === ERR_COOKIE_NOT_FOUND) {
        moduleDeleteCookies(KEY_LOGIN, KEY_ORGANIZATION)
        router.push(ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN)
      } else if (newAccessToken !== accessToken) {
        setAccessToken(newAccessToken)
      }
      if (newOrgToken !== TRUE) {
        moduleDeleteCookies(KEY_ORGANIZATION, KEY_LOGIN)
        router.push(ROUTE_ERR_NOT_FOUND_ORG_TOKEN)
      }
      if (newLoginToken !== TRUE) {
        moduleDeleteCookies(KEY_ACCESS_TOKEN, KEY_LOGIN, KEY_ORGANIZATION)
        router.push(ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN)
      }
    }
    const intervalId = setInterval(checkAccessToken, 500)
    if (accessToken !== ERR_COOKIE_NOT_FOUND) void fetchGetUsers()
    return () => {
      clearInterval(intervalId)
    }
  }, [accessToken])

  const [isSideOpen, setIsSideOpen] = useState(false)
  const clickSideOpen = () => {
    if (isSideOpen) setIsSideOpen(false)
    else {
      setIsSideOpen(true)
    }
  }
  return (
    <>
      <main className="w-full grid gap-4 grid-cols-4 h-4/5 pt-10 md:ml-10 md:mr-10 ml-5 z-1">
        {!isSideOpen ? (
          <TbSquareArrowRightFilled
            className="md:hidden w-8 h-8 absolute top-1/2 dark:text-gray-300 left-0"
            onClick={clickSideOpen}
          />
        ) : (
          <TbSquareArrowLeftFilled
            className="md:hidden w-8 h-8 absolute top-1/2 dark:text-gray-300 left-40"
            onClick={clickSideOpen}
          />
        )}

        <div
          className={`md:static col-span-1 md:w-5/6 md:block ${
            isSideOpen
              ? 'absolute md:bg-none bg-white dark:bg-gray-900 top-14 p-2 left-0 z-10'
              : 'hidden'
          }`}
        >
          <MainCardGroup reRender={reRender} setRerender={setRerender} />
        </div>
        <div className="md:col-span-3 mr-10 col-span-4">
          <MainHub />
        </div>
      </main>
    </>
  )
}
