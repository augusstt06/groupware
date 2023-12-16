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

export type RegisterOrgProps = {
  organization: string
  setOrganization: React.Dispatch<SetStateAction<string>>
  setErrMsg: (errDescription: string) => void
}

export type HubCategoryProps = {
  title: string
  issue: string[]
}

export type PageParam = {
  category: string
}

export type BoardHubType = {
  params: string
}
