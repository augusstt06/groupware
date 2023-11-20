import axios, { type AxiosResponse } from 'axios'

import { type ModuleGetFetchProps, type ModulePostFetchProps } from '@/app/types/moduleTypes'

axios.defaults.withCredentials = true

export const moduleGetFetch = async (props: ModuleGetFetchProps): Promise<AxiosResponse> => {
  const urlParams = { [props.keyName]: props.keyValue }
  return axios.get(`${props.fetchUrl}`, { params: urlParams })
}

export const modulePostFetch = async (props: ModulePostFetchProps): Promise<AxiosResponse> => {
  return axios.post(`${props.fetchUrl}`, props.data, { headers: props.header })
}

export const modulePatchFetch = async (props: ModulePostFetchProps): Promise<void> => {
  return axios.patch(`${props.fetchUrl}`, props.data, { headers: props.header })
}
