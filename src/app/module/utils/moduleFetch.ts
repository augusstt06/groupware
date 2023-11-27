import axios, { type AxiosResponse } from 'axios'

import { type ModuleGetFetchProps, type ModulePostFetchProps } from '@/app/types/moduleTypes'

axios.defaults.withCredentials = true

export const moduleGetFetch = async (props: ModuleGetFetchProps): Promise<Response> => {
  const queryString = new URLSearchParams()
  Object.entries(props.params).forEach(([key, value]) => {
    queryString.append(key, value)
  })
  const urlWithQueryString = `${props.fetchUrl}?${queryString.toString()}`

  return fetch(urlWithQueryString, {
    method: 'GET',
    headers: props.header,
  })
}

export const modulePostFetch = async (props: ModulePostFetchProps): Promise<AxiosResponse> => {
  return axios.post(`${props.fetchUrl}`, props.data, { headers: props.header })
}

export const modulePatchFetch = async (props: ModulePostFetchProps): Promise<void> => {
  return axios.patch(`${props.fetchUrl}`, props.data, { headers: props.header })
}
