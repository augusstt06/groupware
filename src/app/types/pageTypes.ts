import { type SetStateAction } from 'react'

export type ReactProps = {
  children: React.ReactNode
}

export type KeyInfoTypeProps = {
  isPwdView: boolean
  setIsPwdView: React.Dispatch<SetStateAction<boolean>>
  isPwdConfirmView: boolean
  setIsPwdConfirmView: React.Dispatch<SetStateAction<boolean>>
}
