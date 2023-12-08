'use client'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import MainHub from '../component/page/main/hub/MainHub'
import MainCardGroup from '../component/ui/card/MainCardGroup'
import {
  COMPLETE,
  KEY_ACCESS_TOKEN,
  KEY_ORGANIZATION,
  KEY_UUID,
  KEY_X_ORGANIZATION_CODE,
} from '../constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '../constant/errorMsg'
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
  const orgCookie = moduleGetCookie(KEY_ORGANIZATION)
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
        moduleDeleteCookies(KEY_ACCESS_TOKEN)
        router.push('/error/notfound')
      }
    }
  }

  useEffect(() => {
    let newAccessToken
    let newOrgCookie
    const checkAccessToken = () => {
      newAccessToken = moduleGetCookie(KEY_ACCESS_TOKEN)
      newOrgCookie = moduleGetCookie(KEY_ORGANIZATION)
      if (newAccessToken === ERR_COOKIE_NOT_FOUND) {
        router.push('/error/notfound/token')
      } else if (newAccessToken !== accessToken) {
        setAccessToken(newAccessToken)
      }
      if (newOrgCookie !== COMPLETE) {
        router.push('/error/notfound/organization')
      }
    }
    const intervalId = setInterval(checkAccessToken, 500)
    if (accessToken !== ERR_COOKIE_NOT_FOUND && orgCookie === COMPLETE) void fetchGetUsers()
    return () => {
      clearInterval(intervalId)
    }
  }, [accessToken, orgCookie])

  return (
    <>
      <main className="grid gap-4 grid-cols-4 h-4/5  pt-10 ml-10 mr-10">
        <div className="col-span-1 w-5/6">
          <MainCardGroup reRender={reRender} setRerender={setRerender} />
        </div>
        <div className="col-span-3 mr-10">
          <MainHub />
        </div>
      </main>
    </>
  )
}
