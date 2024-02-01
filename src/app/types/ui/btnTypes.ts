import type React from 'react'
import { type Dispatch, type SetStateAction } from 'react'

import { type BoardListResponseType } from '../variableTypes'

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

export type UserStateModalProps = {
  isConfirmOpen: boolean
  setIsConfirmOpen: Dispatch<SetStateAction<boolean>>
  confirmValue: boolean
  setConfirmValue: Dispatch<SetStateAction<boolean>>
  setIsUserStateOpen: Dispatch<SetStateAction<boolean>>
}

export type BoardWriteModalBtnTabProps = {
  handleClickOpenSaveList: () => void
  handleClickPostPending: () => void
  handleClickClose: () => void
  handleClickPosting: () => void
  saveList: BoardListResponseType[]
}
