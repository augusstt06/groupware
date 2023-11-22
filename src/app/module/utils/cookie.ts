import { deleteCookie, getCookie } from 'cookies-next'

export const getToken = (name: string) => {
  const value = getCookie(name) !== undefined ? (getCookie(name) as string) : null
  return value
}

export const deleteToken = (name: string) => {
  deleteCookie(name)
}
