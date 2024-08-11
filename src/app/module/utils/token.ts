import { getCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'

import { checkTokenExpired, moduleDeleteCookies } from './moduleCookie'
import { modulePostFetch } from './moduleFetch'

import { API_SUCCESS_CODE, KEY_ACCESS_TOKEN } from '@/constant/constant'
import { API_URL_REFRESH } from '@/constant/route/api-route-constant'
import {
  type ApiResponseType,
  type CustomDecodeTokenType,
  type FailResponseType,
  type ModulePostFetchProps,
} from '@/types/module'

const accessTokenManager = () => {
  let accessToken = getCookie(KEY_ACCESS_TOKEN) as string
  const setAccessToken = (newToken: string) => {
    accessToken = newToken
  }
  const getAccessToken = () => accessToken
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
  return {
    getAccessToken,
    setAccessToken,
    refreshToken,
  }
}
export const accessToken = accessTokenManager()
