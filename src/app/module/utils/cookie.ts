import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next'

import { ERR_COOKIE_NOT_FOUND } from '@/app/constant/errorMsg'

export const moduleGetCookie = (name: string) => {
  if (hasCookie(name)) {
    return getCookie(name) as string
  }
  return ERR_COOKIE_NOT_FOUND
}
export const moduleSetCookies = (cookies: Record<string, string | number>) => {
  Object.entries(cookies).forEach(([key, value]) => {
    setCookie(key, value)
  })
}

export const moduleDeleteCookies = (...name: string[]) => {
  name.forEach((name) => {
    deleteCookie(name)
  })
}
