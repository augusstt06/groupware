import { type SetStateAction } from 'react'
import type React from 'react'

/// /// basic
export type ReactProps = {
  children: React.ReactNode
}

/// /// component
/// / ui
// button
export type HamburgerProps = {
  nav: boolean
  setNav: (nav: boolean) => void
}

export type BtnProps = {
  title: string
}

export type ConditionBtnProps = {
  isNext: boolean
  handleStep: () => void
}

export type ConditionBtnElementProps = {
  title: string
  handleStep: () => void
  tailwindClass: string
}

// input
export type InfoInputProps = {
  title: string
  placeholder: string
  checkValid: boolean
  icon: React.ReactNode
}

export type PwdInputProps = {
  title: string
  placeholder: string
  icon: React.ReactNode
  isInputValueView: boolean
  setIsInputValueView: React.Dispatch<SetStateAction<boolean>>
}

export type PwdConfirmInputProps = {
  title: string
  placeholder: string
  icon: React.ReactNode
  isPwdConfirmView: boolean
  setIsPwdConfirmView: React.Dispatch<SetStateAction<boolean>>
}

// label
export type InputIconLabelProps = {
  icon: React.ReactNode
}

// progressbar
export type ProgressbarProps = {
  allItems: number
  completedItems: number
}

// sidebar
export type SidebarProps = {
  nav: boolean
}

// Stepper

/// / page
export type KeyInfoTypeProps = {
  isPwdView: boolean
  setIsPwdView: React.Dispatch<SetStateAction<boolean>>
  isPwdConfirmView: boolean
  setIsPwdConfirmView: React.Dispatch<SetStateAction<boolean>>
}

/// module
// utils
export type ModuleGetFetchProps = {
  data: string
  fetchUrl?: string
}
export type ModulePostFetchProps = {
  data: object
  fetchUrl?: string
}

export type InputValidateProps = {
  inputData: string
  dataType: string
}
