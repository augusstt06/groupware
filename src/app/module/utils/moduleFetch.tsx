import axios from 'axios'

import { type ModuleGetFetchProps, type ModulePostFetchProps } from '@/app/types/moduleTypes'

axios.defaults.withCredentials = true

export const moduleGetFetch = async (props: ModuleGetFetchProps) => {
  const urlParams = { email: props.data }
  return axios.get(`${props.fetchUrl}`, { params: urlParams })
}

export const modulePostFetch = async (props: ModulePostFetchProps) => {
  return axios.post(`${props.fetchUrl}`, props.data, { headers: props.header })
}
