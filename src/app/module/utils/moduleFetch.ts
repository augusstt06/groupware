import { DELETE, FETCH_CONTENT_TYPE, GET, PATCH, POST } from '@/constant/constant'
import {
  type FetchResponseType,
  type ModuleGetFetchProps,
  type ModulePostFetchProps,
  type ModulePostFileFetchProps,
} from '@/types/module'

type searchType = {
  address_name: string
  category_group_code: string
  category_group_name: string
  category_name: string
  distance: string
  id: string
  phone: string
  place_name: string
  place_url: string
  road_address_name: string
  x: string
  y: string
}
type KakaoApiResponseType = {
  documents: searchType[]
}
export const moduleGetFetch = async <T>(
  props: ModuleGetFetchProps,
): Promise<FetchResponseType<T>> => {
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

export const moduleKaKaoGetFetch = async (
  props: ModuleGetFetchProps,
): Promise<KakaoApiResponseType> => {
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
// FIXME: 제네릭 변경하기
export const modulePostFetch = async <T>(
  props: ModulePostFetchProps,
): Promise<FetchResponseType<T>> => {
  const res = await fetch(props.fetchUrl as string, {
    method: POST,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...props.header,
    },
    body: JSON.stringify(props.data),
  })
  return res.json()
}

export const modulePostFetchWithQuery = async <T>(
  props: ModulePostFetchProps,
): Promise<FetchResponseType<T>> => {
  const queryString = new URLSearchParams()
  Object.entries(props.data).forEach(([key, value]) => {
    queryString.append(key, String(value))
  })
  const urlWithQueryString = `${props.fetchUrl}?${queryString.toString()}`
  const res = await fetch(urlWithQueryString, {
    method: POST,
    headers: {
      'Content-Type': FETCH_CONTENT_TYPE,
      ...props.header,
    },
    body: JSON.stringify(props.data),
  })
  return res.json()
}

export const modulePostFileFetch = async <T>(
  props: ModulePostFileFetchProps,
): Promise<FetchResponseType<T>> => {
  const res = await fetch(props.fetchUrl as string, {
    method: POST,
    headers: {
      ...props.header,
    },
    body: props.file,
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

export const moduleDeleteFetch = async <T>(
  props: ModuleGetFetchProps,
): Promise<FetchResponseType<T>> => {
  const queryString = new URLSearchParams()
  Object.entries(props.params).forEach(([key, value]) => {
    queryString.append(key, String(value))
  })
  const urlWithQueryString = `${props.fetchUrl}?${queryString.toString()}`

  const res = await fetch(urlWithQueryString, {
    method: DELETE,
    headers: {
      'Content-Type': FETCH_CONTENT_TYPE,
      ...props.header,
    },
  })
  return res.json()
}
export const moduleDeleteFetchWithBody = async <T>(
  props: ModulePostFetchProps,
): Promise<FetchResponseType<T>> => {
  const res = await fetch(props.fetchUrl as string, {
    method: DELETE,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...props.header,
    },
    body: JSON.stringify(props.data),
  })
  return res.json()
}
