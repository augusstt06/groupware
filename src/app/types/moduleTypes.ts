import {
  type Dispatch,
  type MutableRefObject,
  type ReactEventHandler,
  type ReactNode,
  type SetStateAction,
} from 'react'

import { type JwtPayload } from 'jwt-decode'
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { type KEY_UUID, type KEY_X_ORGANIZATION_CODE } from '../constant/constant'

import { type ScheduleListType, type TaskListType } from './variableTypes'

export type UnionStrNumber = string | number

// FIXME: 삭제
export type ApiResponseType = Record<string, UnionStrNumber>

export type SuccessResponseType<T> = {
  status: number
  result: T
}
export type FailResponseType = {
  status: number
  message: string
}

export type FetchResponseType<T> = SuccessResponseType<T> | FailResponseType

export type LoginResponseType = {
  accessToken: string
  email: string
  name: string
  phone: string
  position: string
  userId: number
  uuid: string
}

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
  router: AppRouterInstance
  loginCompleteState: string
  accessToken: string
  setAccessToken: React.Dispatch<SetStateAction<string>>
}

export type ModuleCheckContentIsEmptyProps = {
  successText: string
  dialog: MutableRefObject<HTMLDialogElement | null>
  setBtnValue: Dispatch<React.SetStateAction<DialogBtnValueType>>
  setDialogAlertState: React.Dispatch<
    React.SetStateAction<{
      main: string
      sub: string
    }>
  >
  boardId: number
  editorContents: string
  inputValue: string
  fetchFunction: () => Promise<void>
}

export type ModalUsePortalProps = {
  isModalOpen: boolean
  children: ReactNode
  onClose: ReactEventHandler
  name: string
  btnValue: string
  confirmFunc: () => void
}

export type ModalHubProps = {
  modals: Array<{
    onClose: () => void
    isModalOpen: boolean
    childComponent: JSX.Element
    name: string
    btnValue: string
    confirmFunc: () => void
    dialog?: MutableRefObject<HTMLDialogElement | null>
    dialogAlertText?: {
      main: string
      sub: string
    }
    dialogBtnValue?: DialogBtnValueType
  }>
}

export type DialogModalProps = {
  dialog?: MutableRefObject<HTMLDialogElement | null>
  dialogAlertText?: {
    main: string
    sub: string
  }
  dialogBtnValue?: DialogBtnValueType
}

export type DialogBtnValueType = {
  isCancel: boolean
  cancleFunc: () => void
  cancelText: string
  confirmFunc: () => void
  confirmText: string
}

export type DialogCalenderProps = {
  dialog?: MutableRefObject<HTMLDialogElement | null>
  isWithtime: boolean
  calendarWithTimeData?: ScheduleListType
  calendarData?: TaskListType
}
