import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'

import { moduleDeleteCookies } from './moduleCookie'
import { modulePostFetch } from './moduleFetch'

import { API_SUCCESS_CODE, KEY_ACCESS_TOKEN } from '@/constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '@/constant/errorMsg'
import { API_URL_REFRESH } from '@/constant/route/api-route-constant'
import {
  type ApiResponseType,
  type CustomDecodeTokenType,
  type FailResponseType,
  type ModulePostFetchProps,
} from '@/types/module'

const checkTokenExpired = (accessTime: number): boolean => {
  // 현재시간이 액세스토큰 만료 15분이하라면 true를 반환하고 아니라면 false를 반환한다.
  const current = Math.floor(Date.now() / 1000)
  const difference = accessTime - current
  return difference <= 900
}

const accessToken = () => {
  let accessToken = getCookie(KEY_ACCESS_TOKEN) as string

  const setAccessToken = (newToken: string) => {
    accessToken = newToken
    setCookie(KEY_ACCESS_TOKEN, accessToken)
  }
  const getAccessToken = () => accessToken
  const getUuid = () => {
    const decode = jwtDecode(accessToken)
    let uuid: string = ''
    if ((decode as unknown as string) !== ERR_COOKIE_NOT_FOUND) {
      uuid = (decode as CustomDecodeTokenType).uuid
    } else uuid = ERR_COOKIE_NOT_FOUND
    return uuid
  }
  const refresh = async (accessToken: string) => {
    try {
      const refreshProps: ModulePostFetchProps = {
        data: {},
        fetchUrl: API_URL_REFRESH,
        header: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      const res = await modulePostFetch<ApiResponseType>(refreshProps)
      if (res.status !== API_SUCCESS_CODE) throw new Error((res as FailResponseType).message)
    } catch (err) {
      moduleDeleteCookies(KEY_ACCESS_TOKEN)
    }
  }
  const refreshToken = async () => {
    if (accessToken !== '') {
      const decode = jwtDecode(accessToken)
      const tokenExpireyTime = Number((decode as CustomDecodeTokenType).exp)
      const isTokenExpired = checkTokenExpired(tokenExpireyTime)
      if (isTokenExpired) await refresh(accessToken)
    }
  }
  const deleteAccessToken = () => deleteCookie(accessToken)

  return {
    getAccessToken,
    setAccessToken,
    refreshToken,
    deleteAccessToken,
    getUuid,
  }
}
export const createAccessTokenManager = accessToken()
