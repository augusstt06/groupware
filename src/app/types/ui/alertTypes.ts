import { type SetStateAction } from 'react'

import { type AlertStateType } from '../variableTypes'

export type ErrorAlertType = {
  description: string
  handleClickError: () => void
}

export type ConfirmProps = {
  isConfirmOpen: boolean
  setIsConfirmOpen: React.Dispatch<SetStateAction<boolean>>
  setConfirmValue: React.Dispatch<SetStateAction<boolean>>
}

export type BoardWriteAlertProps = {
  boardCategoryNumber: number
  handleCloseAlertModal: () => void
  alertState: AlertStateType
}
