import { type JwtPayload } from 'jwt-decode'

import { type KEY_UUID, type KEY_X_ORGANIZATION_CODE } from '../constant/constant'

export type UseInputProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  resetValue: () => void
}

export type ModuleGetFetchProps = {
  params: Record<string, string>
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
