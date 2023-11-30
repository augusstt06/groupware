import { FETCH_CONTENT_TYPE, GET, PATCH, POST } from '@/app/constant/constant'
import {
  type ApiRes,
  type ModuleGetFetchProps,
  type ModulePostFetchProps,
  type ReponseType,
} from '@/app/types/moduleTypes'

export const moduleGetFetch = async <T>(props: ModuleGetFetchProps): Promise<ReponseType<T>> => {
  const queryString = new URLSearchParams()
  Object.entries(props.params).forEach(([key, value]) => {
    queryString.append(key, value)
  })
  const urlWithQueryString = `${props.fetchUrl}?${queryString.toString()}`

  const res = await fetch(urlWithQueryString, {
    method: GET,
    headers: props.header,
  })
  if (!res.ok) {
    throw new Error(res.status.toString())
  }
  return res.json()
}

export const modulePostFetch = async (
  props: ModulePostFetchProps,
): Promise<ReponseType<ApiRes>> => {
  const res = await fetch(props.fetchUrl as string, {
    method: POST,
    headers: {
      'Content-Type': FETCH_CONTENT_TYPE,
      ...props.header,
    },
    body: JSON.stringify(props.data),
  })
  if (!res.ok) {
    throw new Error(res.status.toString())
  }
  return res.json()
}

export const modulePatchFetch = async (props: ModulePostFetchProps): Promise<Response> => {
  return fetch(props.fetchUrl as string, {
    method: PATCH,
    headers: {
      'Content-Type': FETCH_CONTENT_TYPE,
      ...props.header,
    },
    body: JSON.stringify(props.data),
  })
}
