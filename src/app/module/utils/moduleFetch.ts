import { FETCH_CONTENT_TYPE, GET, PATCH, POST } from '@/app/constant/constant'
import {
  type FetchResponseType,
  type ModuleGetFetchProps,
  type ModulePostFetchProps,
} from '@/app/types/moduleTypes'

export const moduleGetFetch = async <T>(props: ModuleGetFetchProps): Promise<T> => {
  const queryString = new URLSearchParams()
  Object.entries(props.params).forEach(([key, value]) => {
    queryString.append(key, String(value))
  })
  const urlWithQueryString = `${props.fetchUrl}?${queryString.toString()}`

  const res = await fetch(urlWithQueryString, {
    method: GET,
    headers: props.header,
  })
  return res.json()
}

export const modulePostFetch = async <T>(
  props: ModulePostFetchProps,
): Promise<FetchResponseType<T>> => {
  const res = await fetch(props.fetchUrl as string, {
    method: POST,
    headers: {
      'Content-Type': FETCH_CONTENT_TYPE,
      ...props.header,
    },
    body: JSON.stringify(props.data),
  })
  return res.json()
}

export const modulePatchFetch = async <T>(
  props: ModulePostFetchProps,
): Promise<FetchResponseType<T>> => {
  const res = await fetch(props.fetchUrl as string, {
    method: PATCH,
    headers: {
      'Content-Type': FETCH_CONTENT_TYPE,
      ...props.header,
    },
    body: JSON.stringify(props.data),
  })
  return res.json()
}
