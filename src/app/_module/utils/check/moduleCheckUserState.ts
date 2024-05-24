'use client'

import { moduleDeleteCookies, moduleGetCookie } from '../moduleCookie'

import { KEY_ACCESS_TOKEN, KEY_LOGIN_COMPLETE, TRUE } from '@/_constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '@/_constant/errorMsg'
import {
  ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN,
  ROUTE_ERR_NOT_FOUND_ORG_TOKEN,
} from '@/_constant/route/route-constant'
import { type ModuleCheckUserStateProps } from '@/_types/module'

export const moduleCheckUserState = ({
  loginCompleteState,
  router,
  accessToken,
  setAccessToken,
}: ModuleCheckUserStateProps) => {
  if (accessToken === ERR_COOKIE_NOT_FOUND) {
    router.push(ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN)
    return
  }
  if (loginCompleteState !== TRUE) {
    router.push(ROUTE_ERR_NOT_FOUND_ORG_TOKEN)
    return
  }

  let isStop = false
  const checkInterval = () => {
    if (isStop) return
    const newToken = moduleGetCookie(KEY_ACCESS_TOKEN)

    if (newToken === ERR_COOKIE_NOT_FOUND) {
      moduleDeleteCookies(KEY_LOGIN_COMPLETE)
      router.push(ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN)
      isStop = true
    } else if (newToken !== accessToken) {
      setAccessToken(newToken)
    }
  }
  setInterval(checkInterval, 500)
}
