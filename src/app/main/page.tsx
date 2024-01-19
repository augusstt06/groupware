'use client'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import MainHub from '../component/page/main/hub/MainHub'
import {
  API_SUCCESS_CODE,
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
import { moduleCheckUserState } from '../module/utils/moduleCheckUserState'
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
  type FailResponseType,
  type ModuleCheckUserStateProps,
  type ModuleGetFetchProps,
  type SuccessResponseType,
} from '../types/moduleTypes'

export default function Main() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [accessToken, setAccessToken] = useState(moduleGetCookie(KEY_ACCESS_TOKEN))
  const loginCompleteState = useAppSelector((state) => state.maintain[KEY_LOGIN_COMPLETE])
  const decodeToken = moduleDecodeToken(accessToken)

  const accessTokenTime = Number((decodeToken as CustomDecodeTokenType).exp)
  const attendanceTime = useAppSelector((state) => state.userInfo.attendance.time)
  const uuid =
    decodeToken !== ERR_COOKIE_NOT_FOUND
      ? (decodeToken as CustomDecodeTokenType).uuid
      : ERR_COOKIE_NOT_FOUND

  const getFetchUserProps: ModuleGetFetchProps = {
    params: {
      [KEY_UUID]: uuid,
    },
    fetchUrl: API_URL_GET_USERS,
    header: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  const fetchGetUsers = async () => {
    try {
      const res = await moduleGetFetch<ApiResponseType>(getFetchUserProps)
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)

      const successRes = res as SuccessResponseType<ApiResponseType>
      const extraUserInfoReducerProps = {
        name: successRes.result.name,
        email: successRes.result.email,
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
            dispatch(updateLoginCompleteReducer(FALSE))
            router.push(ROUTE_ERR_NOT_FOUND_ORG_TOKEN)
            break
          default:
            dispatch(updateLoginCompleteReducer(FALSE))
            moduleDeleteCookies(KEY_ACCESS_TOKEN)
        }
      }
    }
  }

  useEffect(() => {
    if (checkTokenExpired(accessTokenTime)) {
      void moduleRefreshToken(accessToken)
    }
    const moduleProps: ModuleCheckUserStateProps = {
      useRouter: router,
      token: accessToken,
      setToken: setAccessToken,
      isCheckInterval: true,
      completeState: loginCompleteState,
      fetchFunc: fetchGetUsers,
    }
    moduleCheckUserState(moduleProps)
  }, [accessToken])

  return (
    <main className="md:w-[50rem] w-[35rem] h-4/5 flex flex-col z-1 items-center">
      <MainHub title={MAIN_CARD_TODO} />
    </main>
  )
}
