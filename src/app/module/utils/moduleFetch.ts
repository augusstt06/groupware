import axios from 'axios'

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

export const modulePostFetch = async (props: ModulePostFetchProps): Promise<Response> => {
  // FIXME: 여기서 res.json해서 주고싶은데 그럼 응답형태를 타입화 해서 Promise<...>에 넣어서 반환값 명시하기
  // 그런데 그렇게 하면 res의 ok상태를 체크해서 여기서 에러를 throw 해야 한다...
  return fetch(props.fetchUrl as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...props.header,
    },
    body: JSON.stringify(props.data),
  })
}

export const modulePatchFetch = async (props: ModulePostFetchProps): Promise<Response> => {
  return fetch(props.fetchUrl as string, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...props.header,
    },
    body: JSON.stringify(props.data),
  })
}
