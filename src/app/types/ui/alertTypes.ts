import { type SetStateAction } from 'react'

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
  handleModalState: () => void
  alertState: {
    headDescription: string
    additianoalDescription: string
    option: {
      positive: string
      negative: string
    }
    isFetch: boolean
  }
  fetchPost: () => Promise<void>
}
