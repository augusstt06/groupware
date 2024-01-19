import { type Dispatch, type SetStateAction } from 'react'

import { type UseInputProps } from '../moduleTypes'
import { type MyBoardType, type ProjectAlertStateType } from '../variableTypes'

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
  rerender: boolean
  setRerender: Dispatch<SetStateAction<boolean>>
}

export type ProjectAlertModalProps = CreateProjectModalProps & {
  alertState: ProjectAlertStateType
}
