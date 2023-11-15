import type React from 'react'
import { type SetStateAction } from 'react'

export type HamburgerProps = {
  nav: boolean
  setNav: React.Dispatch<SetStateAction<boolean>>
}

export type BtnProps = {
  title: string
}

export type RegisterUserBtnProps = {
  handleStep: () => void
}

export type RegisterUserBtnElementProps = RegisterUserBtnProps & {
  title: string
  tailwindClass: string
}

export type OrgChooseBtnProps = {
  organization: string
  setOrganization: React.Dispatch<SetStateAction<string>>
}

export type RegisterOrgBtnProps = {
  title: string
}

export type NextStepOrgTeamProps = RegisterOrgBtnProps & {
  organization: string
  setOrganization: React.Dispatch<SetStateAction<string>>
}
