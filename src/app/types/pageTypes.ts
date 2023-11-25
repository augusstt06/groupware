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
  userInfo: {
    name: string
    position: string
    userId: number
    organizationId: number
    organizationName: string
    attendanceStatus: string
  }
  reRender: boolean
  setRerender: React.Dispatch<SetStateAction<boolean>>
}

export type MenuCardProps = {
  userInfo: {
    name: string
    position: string
    userId: number
    organizationId: number
    organizationName: string
    attendanceStatus: string
  }
}
