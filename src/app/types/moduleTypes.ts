import { type Dispatch, type SetStateAction } from 'react'

import { type JwtPayload } from 'jwt-decode'
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { type KEY_UUID, type KEY_X_ORGANIZATION_CODE } from '../constant/constant'

import { type AlertStateType } from './variableTypes'

export type UnionStrNumber = string | number

export type ApiRes = Record<string, UnionStrNumber>

export type SuccessResponseType<T> = {
  status: number
  result: T
}
export type FailResponseType = {
  status: number
  message: string
}

export type FetchResponseType<T> = SuccessResponseType<T> | FailResponseType

export type UseInputProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  resetValue: () => void
  setString: (data: string) => void
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
export type ModulePostFileFetchProps = {
  file: FormData
  fetchUrl?: string
  header?: Record<string, string>
}

export type InputValidateProps = {
  inputData: string
  dataType: string
}

export type CustomDecodeTokenType = JwtPayload &
  Record<typeof KEY_UUID | typeof KEY_X_ORGANIZATION_CODE, string>

export type ModuleCheckUserStateProps = {
  token: string
  setToken: React.Dispatch<SetStateAction<string>>
  useRouter: AppRouterInstance
  isCheckInterval: boolean
  completeState: string
  fetchFunc?: () => Promise<void>
}

export type ModuleCheckContentIsEmptyProps = {
  boardId: number
  success: { headDescription: string; additianoalDescription: string }
  editorContents: string
  inputValue: string
  handleOpenAlertModal: () => void
  handleCloseAlertModal: () => void
  setAlertStateFunction: Dispatch<SetStateAction<AlertStateType>>
  fetchFunction: () => Promise<void>
}
