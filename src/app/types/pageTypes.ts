import { type SetStateAction } from 'react'

export type ReactProps = {
  children: React.ReactNode
}

export type RegisterInfoTypeProps = {
  isPwdView: boolean
  setIsPwdView: React.Dispatch<SetStateAction<boolean>>
  isPwdConfirmView: boolean
  setIsPwdConfirmView: React.Dispatch<SetStateAction<boolean>>
  setErrMsg: (errDescription: string) => void
}

export type UserCardProps = {
  userInfo: Record<string, string | number>
  reRender: boolean
  setRerender: React.Dispatch<SetStateAction<boolean>>
}

export type MenuCardProps = {
  userInfo: Record<string, string | number>
}

export type RegisterOrgProps = {
  organization: string
  setOrganization: React.Dispatch<SetStateAction<string>>
}
