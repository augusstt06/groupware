'use client'

import { moduleDeleteCookies } from '../moduleCookie'
import { createAccessTokenManager } from '../token'

import { KEY_LOGIN_COMPLETE, TRUE } from '@/constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '@/constant/errorMsg'
import {
  ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN,
  ROUTE_ERR_NOT_FOUND_ORG_TOKEN,
} from '@/constant/route/route-constant'
import { type ModuleCheckUserStateProps } from '@/types/module'

export const moduleCheckUserState = ({ loginCompleteState, router }: ModuleCheckUserStateProps) => {
  const accessTokenManager = createAccessTokenManager
  const { getAccessToken } = accessTokenManager

  if (getAccessToken() === ERR_COOKIE_NOT_FOUND) {
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

    // FIXME: 이 부분 모듈로 뺴거나 다른곳에서 실시하기
    if (getAccessToken() === ERR_COOKIE_NOT_FOUND) {
      moduleDeleteCookies(KEY_LOGIN_COMPLETE)
      router.push(ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN)
      isStop = true
    }
  }
  setInterval(checkInterval, 500)
}
