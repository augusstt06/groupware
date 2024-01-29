import { moduleDeleteCookies, moduleGetCookie } from '../moduleCookie'

import { KEY_ACCESS_TOKEN, KEY_LOGIN_COMPLETE, TRUE } from '@/app/constant/constant'
import { ERR_COOKIE_NOT_FOUND } from '@/app/constant/errorMsg'
import {
  ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN,
  ROUTE_ERR_NOT_FOUND_ORG_TOKEN,
} from '@/app/constant/route/route-constant'
import { type ModuleCheckUserStateProps } from '@/app/types/moduleTypes'

export const moduleCheckUserState = (props: ModuleCheckUserStateProps) => {
  if (props.token === ERR_COOKIE_NOT_FOUND) {
    props.useRouter.push(ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN)
    return
  }
  if (props.completeState !== TRUE) {
    props.useRouter.push(ROUTE_ERR_NOT_FOUND_ORG_TOKEN)
    return
  }

  if (props.isCheckInterval) {
    let isStop = false
    const checkInterval = () => {
      if (isStop) return
      const newToken = moduleGetCookie(KEY_ACCESS_TOKEN)
      if (newToken === ERR_COOKIE_NOT_FOUND) {
        moduleDeleteCookies(KEY_LOGIN_COMPLETE)
        props.useRouter.push(ROUTE_ERR_NOT_FOUND_ACCESS_TOKEN)
        isStop = true
      } else if (newToken !== props.token) {
        props.setToken(newToken)
      }
    }
    setInterval(checkInterval, 500)
    if (props.fetchFunc !== undefined && props.token !== ERR_COOKIE_NOT_FOUND)
      void props.fetchFunc()
  }
}
