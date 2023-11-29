import axios from 'axios'

import { FETCH_CONTENT_TYPE, GET, PATCH, POST } from '@/app/constant/constant'
import {
  type ApiResponseType,
  type ModuleGetFetchProps,
  type ModulePostFetchProps,
} from '@/app/types/moduleTypes'

axios.defaults.withCredentials = true

export const moduleGetFetch = async (props: ModuleGetFetchProps): Promise<ApiResponseType> => {
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

export const modulePostFetch = async (props: ModulePostFetchProps): Promise<ApiResponseType> => {
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
