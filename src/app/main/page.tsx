'use client'
import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import MainHub from '../component/page/main/hub/MainHub'
import {
  FALSE,
  KEY_ACCESS_TOKEN,
  KEY_LOGIN_COMPLETE,
  KEY_UUID,
  KEY_X_ORGANIZATION_CODE,
  MAIN_CARD_TODO,
} from '../constant/constant'
import { ERR_COOKIE_NOT_FOUND, ERR_ORG_NOT_FOUND } from '../constant/errorMsg'
import { API_URL_GET_USERS } from '../constant/route/api-route-constant'
import { ROUTE_ERR_NOT_FOUND_ORG_TOKEN } from '../constant/route/route-constant'
import { useAppDispatch, useAppSelector } from '../module/hooks/reduxHooks'
import { moduleCheckUserState } from '../module/utils/check/moduleCheckUserState'
import {
  checkTokenExpired,
  moduleDecodeToken,
  moduleDeleteCookies,
  moduleGetCookie,
  moduleRefreshToken,
} from '../module/utils/moduleCookie'
import { moduleGetFetch } from '../module/utils/moduleFetch'
import {
  updateAttendanceStatusReducer,
  updateExtraUserInfoReducer,
  updateUserInfoReducer,
} from '../store/reducers/main/userInfoReducer'
import { updateLoginCompleteReducer } from '../store/reducers/maintain/maintainReducer'
import {
  type ApiResponseType,
  type CustomDecodeTokenType,
  type ModuleGetFetchProps,
  type SuccessResponseType,
} from '../types/moduleTypes'

export default function Main() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])
  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const decodeToken = moduleDecodeToken(accessToken)

  const accessTokenTime = Number((decodeToken as CustomDecodeTokenType).exp)
  const attendanceTime = useAppSelector((state) => state.userInfo.attendance.time)
  const uuid =
    decodeToken !== ERR_COOKIE_NOT_FOUND
      ? (decodeToken as CustomDecodeTokenType).uuid
      : ERR_COOKIE_NOT_FOUND

  const { error, data } = useQuery<SuccessResponseType<ApiResponseType>>({
    queryKey: ['users'],
    queryFn: async () => {
      const getFetchUserProps: ModuleGetFetchProps = {
        params: {
          [KEY_UUID]: uuid,
        },
        fetchUrl: API_URL_GET_USERS,
        header: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      const res = await moduleGetFetch<ApiResponseType>(getFetchUserProps)
      return res as SuccessResponseType<ApiResponseType>
    },
  })

  const successFetchUserInfo = () => {
    const userFetchData = data as SuccessResponseType<ApiResponseType>
    const extraInfoProps = {
      name: userFetchData.result.name,
      email: userFetchData.result.email,
      position: userFetchData.result.position,
      userId: userFetchData.result.userId,
      organizationId: userFetchData.result.organizationId,
      organizationName: userFetchData.result.organizationName,
    }
    const userProps = {
      [KEY_X_ORGANIZATION_CODE]: userFetchData.result.organizationCode as string,
      [KEY_UUID]: userFetchData.result[KEY_UUID] as string,
    }
    const attendanceProps = {
      status: userFetchData.result.attendanceStatus as string,
      time: attendanceTime,
    }
    dispatch(updateExtraUserInfoReducer(extraInfoProps))
    dispatch(updateUserInfoReducer(userProps))
    dispatch(updateAttendanceStatusReducer(attendanceProps))
  }

  const failFetchUserInfo = () => {
    switch (error?.message) {
      case ERR_ORG_NOT_FOUND:
        dispatch(updateLoginCompleteReducer(FALSE))
        router.push(ROUTE_ERR_NOT_FOUND_ORG_TOKEN)
        break
      default:
        dispatch(updateLoginCompleteReducer(FALSE))
        moduleDeleteCookies(KEY_ACCESS_TOKEN)
    }
  }

  useEffect(() => {
    if (data !== undefined) successFetchUserInfo()
  }, [accessToken, data])

  useEffect(() => {
    if (error !== null) failFetchUserInfo()
  }, [error])

  // FIXME: 동작 확인하기
  if (checkTokenExpired(accessTokenTime)) {
    void moduleRefreshToken(accessToken)
  }
  useEffect(() => {
    moduleCheckUserState({ loginCompleteState, router, accessToken, setAccessToken })
  }, [accessToken])

  return (
    <main className="w-full 2xl:w-2/3 h-4/5 flex flex-col items-center">
      <MainHub title={MAIN_CARD_TODO} />
    </main>
  )
}
