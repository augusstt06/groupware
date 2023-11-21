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
export type RegisterOrgTeamConfirmBtn = {
  title: string
  handleClick: () => void
}

export type NextStepOrgTeamProps = {
  title: string
  organization: string
  setOrganization: React.Dispatch<SetStateAction<string>>
}

// main
export type AttendanceBtnProps = {
  userId: number
  isAttendance: boolean
  setIsAttendance: React.Dispatch<SetStateAction<boolean>>
}
