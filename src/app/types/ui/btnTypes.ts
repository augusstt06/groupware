import type React from 'react'
import { type Dispatch, type SetStateAction } from 'react'

export type HamburgerProps = {
  nav: boolean
  setNav: React.Dispatch<SetStateAction<boolean>>
}

export type BtnProps = {
  title: string
}
export type NextBtnProps = BtnProps & {
  onClick: () => void
}
export type RegisterUserBtnProps = {
  setErrMsg: (errDecription: string) => void
}
export type SignupBtnProps = BtnProps & {
  setErrMsg: (errDecription: string) => void
  checkInfoComplete: () => void
}

export type RegisterOrgLoginBtnProps = {
  orgType: string
  setErrMsg: (errDecription: string) => void
}
export type OrgChooseBtnProps = {
  organization: string
  setOrganization: React.Dispatch<SetStateAction<string>>
}

export type RegisterOrgBtnProps = BtnProps & {
  setErrMsg: (errDescription: string) => void
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
  extraUserInfo: Record<string, string | number>
  setErrMsg: (errDescripton: string) => void
  reRender: boolean
  setRerender: React.Dispatch<SetStateAction<boolean>>
  elapsed: string
  setElapsed: React.Dispatch<SetStateAction<string>>
}

export type AttendanceHistoryBtnProps = {
  onClick: () => void
}

export type LogoutBtnProps = {
  isConfirmOpen: boolean
  setIsConfirmOpen: Dispatch<SetStateAction<boolean>>
  confirmValue: boolean
  setConfirmValue: Dispatch<SetStateAction<boolean>>
}

export type WriteModalBtnGroupProps = {
  handleClickPostPending: () => void
  handleClickClose: () => void
  handleClickPosting: () => void
}
