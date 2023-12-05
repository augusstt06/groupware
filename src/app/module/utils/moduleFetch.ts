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

// FIXME: response가 fail될때와 success일때 값이 다르기 때문에 여기서 에러를 던지면 안된다. -> 사용하는 곳에서 에러 던져서 catch 하기
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
