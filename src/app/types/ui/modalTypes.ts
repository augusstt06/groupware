import { type Dispatch, type ReactEventHandler, type SetStateAction } from 'react'

import { type UseInputProps } from '../moduleTypes'
import {
  type BoardListResponseType,
  type ColleagueType,
  type MyBoardType,
  type ProjectAlertStateType,
} from '../variableTypes'

export type BoardWriteModalprops = {
  currentBoard: MyBoardType | null
}
export type CreateProjectModalColorSelectProps = {
  colorList: Array<{
    name: string
    value: string
  }>
  handleSelectColor: (colorName: string) => void
  selectColor: string
}

export type CreateProjectModalInputProps = {
  projectName: UseInputProps
}

export type CreateProjectModalConfirmBtnProps = {
  handleClickCreateProject: () => void
}

export type CreateProjectModalProps = {
  projectName: UseInputProps
  colorList: Array<{
    name: string
    value: string
  }>
  handleSelectColor: (colorName: string) => void
  selectColor: string
}

export type ProjectAlertModalProps = CreateProjectModalProps & {
  alertState: ProjectAlertStateType
}
export type ModalBtnProps = {
  onClose: ReactEventHandler
  btnValue: string
  confirmFunc: () => void
}

export type UserStateModalProps = {
  isConfirmOpen: boolean
  setIsConfirmOpen: Dispatch<SetStateAction<boolean>>
  confirmValue: boolean
  setConfirmValue: Dispatch<SetStateAction<boolean>>
  setIsUserStateOpen: Dispatch<SetStateAction<boolean>>
}

export type BoardWriteModalBtnTabProps = {
  handleClickOpenSaveList: () => void
  handleClickPostPending: () => void
  handleClickClose: () => void
  handleClickPosting: () => void
  saveList: BoardListResponseType[]
}
export type InviteProjectMemberModalProps = {
  colleague: ColleagueType[]
}
