import { type SetStateAction } from 'react'
import type React from 'react'

/// /// basic
export interface ReactProps {
  children: React.ReactNode
}

/// /// component
/// / ui
// button
export interface HamburgerProps {
  nav: boolean
  setNav: (nav: boolean) => void
}

export interface BtnProps {
  title: string
}

export type SignupBtnProps = BtnProps & {
  isKeyInfoComplete: boolean
}

export interface ConditionBtnProps {
  isKeyInfoComplete: boolean
  isNext: boolean
  handleStep: () => void
}

export interface ConditionBtnElementProps {
  title: string
  isKeyInfoComplete: boolean
  handleStep: () => void
  tailwindClass: string
}

// input
export interface InfoInputProps {
  title: string
  placeholder: string
  checkValid: boolean
  icon: React.ReactNode
}

export interface PwdInfoProps {
  checkValid: boolean
  isPwdView: boolean
  setIsPwdView: React.Dispatch<SetStateAction<boolean>>
  isPwdConfirmView: boolean
  setIsPwdConfirmView: React.Dispatch<SetStateAction<boolean>>
}

export type PwdInputProps = InfoInputProps & {
  icon: React.ReactNode
  isPwdView: boolean
  setIsPwdView: React.Dispatch<SetStateAction<boolean>>
}

export interface PwdConfirmInputProps {
  title: string
  placeholder: string
  icon: React.ReactNode
  isPwdConfirmView: boolean
  setIsPwdConfirmView: React.Dispatch<SetStateAction<boolean>>
}

// label
export interface InputIconLabelProps {
  icon: React.ReactNode
}

// progressbar
export interface ProgressbarProps {
  allItems: number
  completedItems: number
}

// sidebar
export interface SidebarProps {
  nav: boolean
}

// Stepper

/// / page
export interface KeyInfoTypeProps {
  isPwdView: boolean
  setIsPwdView: React.Dispatch<SetStateAction<boolean>>
  isPwdConfirmView: boolean
  setIsPwdConfirmView: React.Dispatch<SetStateAction<boolean>>
}

/// module
// utils
export interface ModuleGetFetchProps {
  data: string
  fetchUrl?: string
}
export interface ModulePostFetchProps {
  data: object
  fetchUrl?: string
}

export interface InputValidateProps {
  inputData: string
  dataType: string
}
