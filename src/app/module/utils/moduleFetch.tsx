import axios from 'axios'

import { type ModuleGetFetchProps, type ModulePostFetchProps } from '@/app/types'

axios.defaults.withCredentials = true

export const moduleGetFetch = async (props: ModuleGetFetchProps) => {
  const urlParams = { email: props.data }
  const res = axios.get(`${props.fetchUrl}`, { params: urlParams })
  return await res
}

export const modulePostFetch = async (props: ModulePostFetchProps) => {
  const res = axios.post(`${props.fetchUrl}`, props.data)

  return await res
}
