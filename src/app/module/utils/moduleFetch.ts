import axios, { HttpStatusCode } from 'axios'

import { ERR_400, ERR_500, ERR_DEFAULT } from '@/app/constant/errorMsg'
import { type ModuleGetFetchProps, type ModulePostFetchProps } from '@/app/types/moduleTypes'

axios.defaults.withCredentials = true

// FIXME: 에러처리를 모듈에서 실시하므로, 해당 모듈을 사용하는 컴포넌트에서는 응답값이 response인지 string인지만 구분해서 사용하면 된다.
// 즉, 원래 모듈을 호출되던 곳에서 실시하던 에러처리를 이곳으로 변경했기 때문에, 원래 있던 에러처리 삭제
export const moduleGetFetch = async (props: ModuleGetFetchProps): Promise<Response | string> => {
  try {
    const queryString = new URLSearchParams()
    Object.entries(props.params).forEach(([key, value]) => {
      queryString.append(key, value)
    })
    const urlWithQueryString = `${props.fetchUrl}?${queryString.toString()}`

    const res = await fetch(urlWithQueryString, {
      method: 'GET',
      headers: props.header,
    })
    if (!res.ok) {
      throw new Error(res.status.toString())
    }
    const resData = await res.json()
    return resData
  } catch (err) {
    let errStatus
    if (err instanceof Error) errStatus = Number(err.message)
    switch (errStatus) {
      case HttpStatusCode.BadGateway:
        return ERR_400
      case HttpStatusCode.InternalServerError:
        return ERR_500
      default:
        return ERR_DEFAULT
    }
  }
}

export const modulePostFetch = async (props: ModulePostFetchProps): Promise<Response | string> => {
  try {
    const res = await fetch(props.fetchUrl as string, {
      method: 'POST',
      headers: props.header,
      body: JSON.stringify(props.data),
    })
    if (!res.ok) {
      throw new Error(res.status.toString())
    }
    const resData = await res.json()
    return resData
  } catch (err) {
    let errStatus
    if (err instanceof Error) errStatus = Number(err.message)
    switch (errStatus) {
      case HttpStatusCode.BadRequest:
        return ERR_400
      case HttpStatusCode.InternalServerError:
        return ERR_500
      default:
        return ERR_DEFAULT
    }
  }
}

export const modulePatchFetch = async (props: ModulePostFetchProps): Promise<void> => {
  return axios.patch(`${props.fetchUrl}`, props.data, { headers: props.header })
}
