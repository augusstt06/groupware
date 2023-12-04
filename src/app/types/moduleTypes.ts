import { type JwtPayload } from 'jwt-decode'

import { type KEY_UUID, type KEY_X_ORGANIZATION_CODE } from '../constant/constant'

export type UnionStrNumber = string | number

export type ApiRes = Record<string, UnionStrNumber>

export type ResponseType<T> = {
  status: number
  message?: string
  result?: T
}
export type SuccessResponseType<T> = {
  status: number
  result: T
}
export type UseInputProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  resetValue: () => void
}

export type ModuleGetFetchProps = {
  params: Record<string, string | number>
  fetchUrl?: string
  header?: Record<string, string>
}
export type ModulePostFetchProps = {
  data: object
  fetchUrl?: string
  header?: Record<string, string>
}

export type InputValidateProps = {
  inputData: string
  dataType: string
}

export type CustomDecodeTokenType = JwtPayload &
  Record<typeof KEY_UUID | typeof KEY_X_ORGANIZATION_CODE, string>
