import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'

import { ERR_COOKIE_NOT_FOUND } from '@/app/constant/errorMsg'
import { type CustomDecodeTokenType } from '@/app/types/moduleTypes'

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
