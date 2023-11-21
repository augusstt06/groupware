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

export type UserCardProps = {
  userInfo: { name: string; position: string; userId: number }
  decode: { uuid: string; iss: string; iat: number; exp: number }
}
