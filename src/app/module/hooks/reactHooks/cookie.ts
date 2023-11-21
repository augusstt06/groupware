import { getCookie } from 'cookies-next'

export const getToken = (name: string) => {
  const value = getCookie(name) !== undefined ? (getCookie(name) as string) : 'undefined'
  return value
}
