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
  setErrMsg: (errDecription: string) => void
}
export type SignupBtnProps = BtnProps & {
  setErrMsg: (errDecription: string) => void
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

export type LoginBtnProps = BtnProps & {
  setErrMsg: (errDescription: string) => void
}
// main
export type AttendanceBtnProps = {
  userInfo: {
    name: string
    position: string
    userId: number
    organizationId: number
    organizationName: string
    attendanceStatus: string
  }
  setErrMsg: (errDescripton: string) => void
  reRender: boolean
  setRerender: React.Dispatch<SetStateAction<boolean>>
}
