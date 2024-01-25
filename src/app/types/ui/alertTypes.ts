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
