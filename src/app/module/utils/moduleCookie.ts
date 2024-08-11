import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next'

import { KEY_ACCESS_TOKEN } from '@/constant/constant'
import { ERR_ACCESS, ERR_COOKIE_NOT_FOUND } from '@/constant/errorMsg'

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
