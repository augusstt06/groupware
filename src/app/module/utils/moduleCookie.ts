import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'

import { modulePostFetch } from './moduleFetch'

import { API_SUCCESS_CODE, KEY_ACCESS_TOKEN } from '@/constant/constant'
import { ERR_ACCESS, ERR_COOKIE_NOT_FOUND } from '@/constant/errorMsg'
import { API_URL_REFRESH } from '@/constant/route/api-route-constant'
import {
  type ApiResponseType,
  type CustomDecodeTokenType,
  type FailResponseType,
  type ModulePostFetchProps,
} from '@/types/module'

export const moduleGetCookie = (name: string) => {
  if (name === KEY_ACCESS_TOKEN) return ERR_ACCESS
  if (hasCookie(name)) {
    return getCookie(name) as string
  }

  return ERR_COOKIE_NOT_FOUND
}
export const moduleSetCookies = (cookies: Record<string, string | number>): void => {
  if (Object.keys(cookies)[0] === KEY_ACCESS_TOKEN) return
  Object.entries(cookies).forEach(([key, value]) => {
    setCookie(key, value)
  })
}

export const moduleDeleteCookies = (...name: string[]): void => {
  name.forEach((name) => {
    if (name !== KEY_ACCESS_TOKEN) deleteCookie(name)
  })
}

export const moduleDecodeToken = (token: string): CustomDecodeTokenType | string => {
  if (token !== ERR_COOKIE_NOT_FOUND) {
    const decodeToken = jwtDecode<CustomDecodeTokenType>(token)
    return decodeToken
  }
  return ERR_COOKIE_NOT_FOUND
}

export const moduleRefreshToken = async (accessToken: string) => {
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

export const checkTokenExpired = (accessTime: number): boolean => {
  // 현재시간이 액세스토큰 만료 15분이하라면 true를 반환하고 아니라면 false를 반환한다.
  const current = Math.floor(Date.now() / 1000)

  const difference = accessTime - current

  return difference <= 900
}
