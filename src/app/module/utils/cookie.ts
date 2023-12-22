import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'

import { modulePostFetch } from './moduleFetch'

import { ERR_COOKIE_NOT_FOUND } from '@/app/constant/errorMsg'
import {
  type ApiRes,
  type CustomDecodeTokenType,
  type FailResponseType,
  type FetchResponseType,
  type ModulePostFetchProps,
} from '@/app/types/moduleTypes'

export const moduleGetCookie = (name: string) => {
  if (hasCookie(name)) {
    return getCookie(name) as string
  }
  return ERR_COOKIE_NOT_FOUND
}
export const moduleSetCookies = (cookies: Record<string, string | number>): void => {
  Object.entries(cookies).forEach(([key, value]) => {
    setCookie(key, value)
  })
}

export const moduleDeleteCookies = (...name: string[]): void => {
  name.forEach((name) => {
    deleteCookie(name)
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
      fetchUrl: process.env.NEXT_PUBLIC_REFRESH_TOKEN_SOURCE,
      header: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    const res = await modulePostFetch<FetchResponseType<ApiRes>>(refreshProps)
    if (res.status !== 200) throw new Error((res as FailResponseType).message)
  } catch (err) {}
}

export const checkTokenExpired = (accessTime: number) => {
  // 현재시간이 액세스토큰 만료 15분이하라면 true를 반환하고 아니라면 false를 반환한다.
  const current = Math.floor(Date.now() / 1000)

  const difference = accessTime - current

  return difference <= 900
}
